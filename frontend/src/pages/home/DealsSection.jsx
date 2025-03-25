import React from 'react';
import dealsImg from "../../assets/aligned_toy_3.png"; // Update with your toy deals image

const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="Leksakserbjudanden" />
      </div>

      <div className="deals__content">
        <h5>Få upp till 20% rabatt</h5>
        <h4>Månadens Leksakserbjudanden</h4>
        <p>
          Upptäck våra fantastiska erbjudanden på leksaker denna månad! Perfekt för att hitta den 
          bästa presenten eller lägga till något nytt i leklådan. Välj bland pedagogiska spel, 
          mjukisdjur, byggklossar och mycket mer – till rabatterade priser.
        </p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Dagar</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Timmar</p>
          </div>
          <div className="deals__countdown__card">
            <h4>15</h4>
            <p>Min</p>
          </div>
          <div className="deals__countdown__card">
            <h4>05</h4>
            <p>Sek</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
