import React, { useEffect, useState } from 'react';
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from '../../../../redux/features/products/productsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import UploadImage from '../addProduct/UploadImage';
import SelectInput from '../addProduct/SelectInput';

const categories = [
  { label: "Välj kategori", value: "" },
  { label: "Gosedjur", value: "gosedjur" },
  { label: "Trä-leksaker", value: "trä-leksaker" },
  { label: "Pussel-bygg", value: "pussel-bygg" },
  { label: "Spel-pyssel", value: "spel-pyssel" },
  { label: "Fordon", value: "fordon" },
  { label: "Böcker", value: "böcker" },
  { label: "Babykläder", value: "babykläder" },
];

const colors = [
  { label: "Välj färg", value: "" },
  { label: "Brun", value: "brun" },
  { label: "Vit", value: "vit" },
  { label: "Blå", value: "blå" },
  { label: "Röd", value: "röd" },
  { label: "Grön", value: "grön" },
  { label: "Rosa", value: "rosa" },
  { label: "Ljusblå", value: "ljusblå" },
  { label: "Flerfärgad", value: "flerfärgad" },
];

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    description: "",
    image: null,
    price: 0,
    oldPrice: "",
  });

  const [newImage, setNewImage] = useState(null);

  const {
    data: productData,
    isLoading: isProductLoading,
    error: fetchError,
    refetch,
  } = useFetchProductByIdQuery(id);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      const p = productData.product;
      setProduct({
        name: p.name || "",
        category: p.category || "",
        color: p.color || "",
        description: p.description || "",
        image: p.image || null,
        price: p.price || 0,
        oldPrice: p.oldPrice || "",
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      image: newImage ? newImage : product.image,
      author: user?.id,
    };

    try {
      await updateProduct({ id, ...updatedProduct }).unwrap();
      alert('Produkten har uppdaterats!');
      await refetch();
      navigate("/dashboard/manage-products");
    } catch (error) {
      console.error('Misslyckades med att uppdatera produkten', error);
      alert("Kunde inte uppdatera produkten.");
    }
  };

  if (isProductLoading) return <div>Laddar...</div>;
  if (fetchError) return <div>Kunde inte hämta produktdata.</div>;

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-6'>Uppdatera produkt</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <TextInput
          label="Produktnamn"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Produktnamn"
        />
        <SelectInput
          label="Kategori"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />
        <SelectInput
          label="Färg"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />
        <TextInput
          label="Pris (kr)"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Pris"
        />
        <TextInput
          label="Ordinarie pris (kr)"
          name="oldPrice"
          type="number"
          value={product.oldPrice}
          onChange={handleChange}
          placeholder="Tidigare pris (valfritt)"
        />
        <UploadImage
          name="image"
          setImage={handleImageChange}
        />
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Beskrivning</label>
          <textarea
            name="description"
            id="description"
            className="border p-2 w-full rounded-md bg-gray-100 text-sm"
            value={product.description}
            onChange={handleChange}
            placeholder="Beskriv produkten"
          />
        </div>
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isUpdating ? "Uppdaterar..." : "Uppdatera produkt"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
