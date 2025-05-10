import React, { useEffect, useState } from 'react';
import dealsImg from "../../assets/nalle.png";
import { Link } from "react-router-dom";

const DealsSection = () => {
  const getOrCreateTargetDate = () => {
    const savedDate = localStorage.getItem("dealsCountdownTarget");
    if (savedDate) {
      return new Date(savedDate);
    } else {
      const newTarget = new Date();
      newTarget.setDate(newTarget.getDate() + 14); 
      localStorage.setItem("dealsCountdownTarget", newTarget.toISOString());
      return newTarget;
    }
  };

  const targetDate = getOrCreateTargetDate();

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
            <h4>{String(timeLeft.days).padStart(2, '0')}</h4>
            <p>Dagar</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{String(timeLeft.hours).padStart(2, '0')}</h4>
            <p>Timmar</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{String(timeLeft.minutes).padStart(2, '0')}</h4>
            <p>Min</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{String(timeLeft.seconds).padStart(2, '0')}</h4>
            <p>Sek</p>
          </div>
        </div>

        <div className="mt-6">
  <Link to="/shop" className="btn">
    Utforska Butiken
  </Link>
</div>
      </div>
    </section>
  );
};

export default DealsSection;
