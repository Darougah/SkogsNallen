import React from 'react';

const CareersPage = () => {
  return (
    <section className="section__container text-center py-16">
      <h2 className="section__header mb-8 text-3xl">Jobba med oss</h2>
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-lg text-left">
        <p className="text-lg text-gray-700 mb-6">
          På SkogsNallen bygger vi mer än bara leksaker – vi bygger framtiden. Vi söker passionerade, kreativa och engagerade personer
          som vill bidra till barns utveckling och glädje genom hållbar och pedagogisk lek.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">Vad vi erbjuder:</h3>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
          <li>En inkluderande och varm arbetsmiljö där alla röster räknas.</li>
          <li>Möjlighet att växa både personligt och professionellt.</li>
          <li>Arbete med produkter som gör skillnad i barns liv.</li>
          <li>Flexibilitet, kreativitet och gemenskap i vardagen.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">Hur du söker</h3>
        <p className="text-gray-700 mb-6">
          Vi annonserar lediga tjänster här på sidan – men vi älskar också spontanansökningar!
          Skicka gärna ditt CV och ett personligt brev till <a href="mailto:jobb@skogsnallen.se" className="text-primary underline">jobb@skogsnallen.se</a>.
        </p>

        <p className="text-gray-700">
          Vill du vara med och skapa något meningsfullt varje dag? Tveka inte att höra av dig – vi ser fram emot att lära känna dig!
        </p>
      </div>
    </section>
  );
};

export default CareersPage;
