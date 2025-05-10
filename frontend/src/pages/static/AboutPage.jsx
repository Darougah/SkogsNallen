import React from 'react';

const AboutPage = () => {
  return (
    <section className="section__container text-center py-16">
      <h2 className="section__header mb-8 text-3xl">Om SkogsNallen</h2>
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-lg text-left text-gray-700">
        <p className="mb-6 text-lg">
          SkogsNallen är en passionerad och familjeägd leksaksbutik med hjärtat i hållbarhet, kreativitet och barns utveckling.
          Vårt handplockade sortiment består av pedagogiska, trygga och inspirerande leksaker som passar barn i alla åldrar.
        </p>

        <p className="mb-6 text-lg">
          Vi tror på lärande genom lek – att varje leksak är en möjlighet att upptäcka, förstå och växa. Genom att välja produkter
          som stimulerar fantasi och nyfikenhet, vill vi bidra till en mer medveten och magisk barndom.
        </p>

        <p className="mb-6 text-lg">
          Som småföretag är vi stolta över vår personliga service, vårt engagemang i kundrelationer och vår närhet till varje beställning.
          Vi är mer än bara en butik – vi är en gemenskap som bryr sig om nästa generation.
        </p>

        <p className="text-lg">
          Tack för att du stödjer oss och väljer leksaker som gör skillnad. Tillsammans skapar vi glädje, trygghet och meningsfulla minnen.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
