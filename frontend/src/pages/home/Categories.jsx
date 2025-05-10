import React from "react";
import { Link } from "react-router-dom";

import category1 from "../../assets/nalle.png";
import category2 from "../../assets/trä-leksaker.png";
import category3 from "../../assets/pussel-bygg.png";
import category4 from "../../assets/pussel-bygg.png";
import category5 from "../../assets/babykläder.png";
import category6 from "../../assets/böcker.png";
import category7 from "../../assets/figurer.png";
import category8 from "../../assets/fordon.png";

const categories = [
  { name: "Gosedjur", path: "gosedjur", image: category1 },
  { name: "Träleksaker", path: "trä-leksaker", image: category2 },
  { name: "Pussel & Bygg", path: "pussel-bygg", image: category3 },
  { name: "Spel & Pyssel", path: "spel-pyssel", image: category4 },
  { name: "Babykläder", path: "babykläder", image: category5 },
  { name: "Böcker", path: "böcker", image: category6 },
  { name: "Figurer", path: "figurer", image: category7 },
  { name: "Fordon", path: "fordon", image: category8 }
];

const Categories = () => {
  return (
    <div className="product__grid">
      {categories.map((category) => (
        <Link key={category.name} to={`/categories/${category.path}`} className="categories__card">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
          <h4 className="text-lg font-semibold mt-2 text-text-dark capitalize">{category.name}</h4>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
