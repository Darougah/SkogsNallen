import React from "react";
import { Link } from "react-router-dom";

import category1 from "../../assets/toys-plush.jpg"; 
import category2 from "../../assets/toys-wooden.jpg"; 
import category3 from "../../assets/toys-puzzles.jpg"; 
import category4 from "../../assets/toys-games.jpg"; 

const Categories = () => {
  const categories = [
    { name: "Gosedjur", path: "gosedjur", image: category1 }, 
    { name: "Träleksaker", path: "tra-leksaker", image: category2 },
    { name: "Pussel & Bygg", path: "pussel-bygg", image: category3 }, 
    { name: "Spel & Pyssel", path: "spel-pyssel", image: category4 }, 
  ];

  return (
    <div className="product__grid">
      {categories.map((category) => (
        <Link key={category.name} to={`/categories/${category.path}`} className="categories__card">
          <img src={category.image} alt={category.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
          <h4 className="text-lg font-semibold mt-2 text-text-dark">{category.name}</h4>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
