import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useAddProductMutation } from "../../../../redux/features/products/productsApi";
import { useNavigate } from 'react-router-dom';

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

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    price: "",
    oldPrice: "",
    description: "",
  });

  const [image, setImage] = useState("");
  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.category || !product.color || !product.price || !product.description || !image) {
      alert("Vänligen fyll i alla fält.");
      return;
    }

    try {
      await addProduct({ ...product, image, author: user?.id }).unwrap();
      alert("Produkt tillagd!");
      setProduct({ name: "", category: "", color: "", price: "", oldPrice: "", description: "" });
      setImage('');
      navigate("/shop");
    } catch (error) {
      console.log("Misslyckades med att lägga in produkten", error);
      alert("Kunde inte spara produkten.");
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-xl">
      <h2 className="text-2xl font-bold mb-6">Lägg till ny produkt</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput label="Produktnamn" name="name" value={product.name} onChange={handleChange} placeholder="Produktnamn" />
        <SelectInput label="Kategori" name="category" value={product.category} onChange={handleChange} options={categories} />
        <SelectInput label="Färg" name="color" value={product.color} onChange={handleChange} options={colors} />
        <TextInput label="Pris (kr)" name="price" type="number" value={product.price} onChange={handleChange} placeholder="Pris" />
        <TextInput label="Ordinarie pris (kr)" name="oldPrice" type="number" value={product.oldPrice} onChange={handleChange} placeholder="Tidigare pris (valfritt)" />
        <UploadImage name="image" setImage={setImage} />
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Beskrivning</label>
          <textarea name="description" id="description" className="border p-2 w-full rounded-md bg-gray-100 text-sm" value={product.description} onChange={handleChange} placeholder="Beskriv produkten" />
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          {isLoading ? "Sparar..." : "Lägg till produkt"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
