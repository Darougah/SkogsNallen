import React from 'react';

const PromoBanner = () => {
  return (
    <section className="section__container banner__container">
      <div className="banner__card">
        <span><i className="ri-truck-line"></i></span>
        <h4>Fri Frakt</h4>
        <p>Gratis leverans på beställningar över 500 kr.</p>
      </div>
      <div className="banner__card">
        <span><i className="ri-money-dollar-circle-line"></i></span>
        <h4>100% Pengarna Tillbaka Garanti</h4>
        <p>Om du inte är nöjd, erbjuder vi en enkel retur och full återbetalning.</p>
      </div>
      <div className="banner__card">
        <span><i className="ri-speak-line"></i></span>
        <h4>Snabb Kundsupport</h4>
        <p>Vårt team hjälper dig med alla frågor – snabbt och smidigt.</p>
      </div>
    </section>
  );
};

export default PromoBanner;
