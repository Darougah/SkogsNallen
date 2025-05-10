import React from 'react';

const TermsPage = () => {
  return (
    <section className="section__container text-center py-16">
      <h2 className="section__header mb-10 text-3xl">Villkor & Regler</h2>
      <div className="max-w-5xl mx-auto text-left text-base leading-relaxed bg-white p-10 rounded-xl shadow-lg">
        <p className="mb-6 text-gray-700">
          När du handlar hos SkogsNallen accepterar du våra användarvillkor, vilket säkerställer en trygg och tydlig köpupplevelse.
          Vi strävar efter full transparens och ansvar i hantering av både beställningar och dina personuppgifter.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-800">Köpvillkor</h3>
        <ul className="list-disc pl-6 mb-6 space-y-3 text-gray-700">
          <li>Alla priser på webbplatsen är inklusive moms (25%).</li>
          <li>Du har alltid 14 dagars ångerrätt enligt distanshandelslagen.</li>
          <li>Produkten ska returneras oanvänd och i ursprungligt skick för att återbetalning ska ske.</li>
          <li>Fraktkostnader för retur bekostas av kunden, om inte annat överenskommits.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 text-gray-800">Personuppgifter & Integritet</h3>
        <p className="mb-6 text-gray-700">
          Vi skyddar dina uppgifter enligt GDPR. Personlig information används endast för att genomföra din beställning och förbättra vår service.
          Dina uppgifter säljs aldrig vidare till tredje part.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-800">Reklamationer & Kundtjänst</h3>
        <p className="mb-6 text-gray-700">
          Om du upptäcker fel på en vara, vänligen kontakta oss omgående via vår kundtjänst. Vi hanterar reklamationer snabbt och rättvist.
        </p>

        <p className="mt-8 text-gray-700">
          För mer information, vänligen läs vår <a href="/pages/privacy" className="text-primary underline">Integritetspolicy</a> och <a href="/pages/user-agreement" className="text-primary underline">Användarvillkor</a>.
        </p>
      </div>
    </section>
  );
};

export default TermsPage;