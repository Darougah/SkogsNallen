import React from 'react';
import { Link } from 'react-router-dom';

import card1 from "../../assets/aligned_toy_1.png";
import card2 from "../../assets/aligned_toy_4.png";
import card3 from "../../assets/aligned_toy_3.png";

const cards = [
  {
    id: 1,
    image: card1,
    trend: 'Populärt just nu',
    title: 'Spel & Pyssel',
    path: 'spel-pyssel',
  },
  {
    id: 2,
    image: card2,
    trend: 'Populärt just nu',
    title: 'Gosedjur',
    path: 'gosedjur',
  },
  {
    id: 3,
    image: card3,
    trend: 'Populärt just nu',
    title: 'Träleksaker',
    path: 'trä-leksaker',
  },
];

const HeroSection = () => {
  return (
    <section className='section__container hero__container'>
      {cards.map((card) => (
        <div key={card.id} className='hero__card'>
          <img src={card.image} alt={card.title} />
          <div className='hero__content'>
            <p>{card.trend}</p>
            <h4>{card.title}</h4>
            <Link to={`/categories/${card.path}`}>Ta en titt</Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
