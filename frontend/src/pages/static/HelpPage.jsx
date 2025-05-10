import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const HelpPage = () => {
  const faqs = [
    {
      question: 'Hur lång är leveranstiden?',
      answer: 'Normalt levererar vi inom 2–5 arbetsdagar. Under högsäsong kan det ta något längre tid.'
    },
    {
      question: 'Kan jag returnera en produkt?',
      answer: 'Ja, vi erbjuder 14 dagars öppet köp. Produkten måste vara oanvänd och i originalförpackning.'
    },
    {
      question: 'Hur spårar jag min beställning?',
      answer: 'När din order har skickats får du ett mejl med spårningsnummer och länk till fraktbolaget.'
    },
    {
      question: 'Vilka betalningsmetoder accepterar ni?',
      answer: 'Vi accepterar kortbetalning (Visa, MasterCard), Swish och Klarna.'
    },
    {
      question: 'Vart skickar ni?',
      answer: 'Vi levererar inom Sverige. För förfrågningar om internationell frakt, kontakta vår kundtjänst.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section__container text-center py-12">
      <h2 className="section__header mb-6">Hjälp & Support</h2>
      <div className="section__subheader max-w-3xl mx-auto text-left text-base leading-relaxed">
        <p className="mb-4">
          Behöver du hjälp med en beställning eller har du frågor om våra produkter? Vårt supportteam är här för att hjälpa dig.
        </p>
        <p className="mb-2"><strong>E-post:</strong> support@skogsnallen.se</p>
        <p className="mb-2"><strong>Telefon:</strong> (+46) 73-613 00 70</p>
        <p className="mb-6">Du kan även läsa vanliga frågor nedan för att få snabba svar.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Vanliga Frågor (FAQ)</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-md shadow-sm bg-white cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h4 className="font-semibold text-gray-800 flex justify-between items-center">
                {faq.question}
                {openIndex === index ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
              </h4>
              {openIndex === index && (
                <p className="text-gray-600 text-sm leading-relaxed mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpPage;
