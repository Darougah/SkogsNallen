import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";

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
  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = () => {};

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Lägg till ny produkt</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          Label="Produktnamn"
          name="name"
          value={product.name}
          onChange={handleChange}
          type="text"
          placeholder="Produktnamn"
        />
        <SelectInput
          Label="Kategori "
          name="category"
          value={product.category}
          onChange={handleChange}
        options={categories}
        />
        <SelectInput
          Label="Färg"
          name="color"
          value={product.color}
          onChange={handleChange}
        options={colors}
        />

<TextInput
  Label="Pris (kr)"
  name="price"
  value={product.price}
  onChange={handleChange}
  type="number"
  placeholder="Pris"
/>

<TextInput
          label="Beskrivning"
          name="description"
          value={product.description}
          onChange={handleChange}
          type="text"
          placeholder="Beskriv kort produkten"
        />

<UploadImage
name ="image"
id="image"
value={e=>e.setImage(e.target.value)}
placeholder="Upload Image"
setImage={setImage}
/>

      </form>
    </div>
  );
};

export default AddProduct;
