import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingStars from '../../../components/RatingStars';

const SingleProduct = () => {
  const { id } = useParams();
console.log(id)
  return (
    <>
      <section className="section__container bg-[#d4edda]">
        <h2 className="section__header capitalize">Produktdetalj</h2>
        <div className="section__subheader flex items-center gap-2 justify-center text-sm">
          <Link to="/" className="hover:text-[--primary-color]">Hem</Link>
          <i className="ri-arrow-right-wide-line text-[--primary-color-dark]"></i>
          <Link to="/shop" className="hover:text-[--primary-color]">Butik</Link>
          <i className="ri-arrow-right-wide-line text-[--primary-color-dark]"></i>
          <span className="text-gray-500">Produktnamn</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="md:w-1/2 w-full">
            <img
              src="https://perfectcolourants.com/wp-content/uploads/2023/10/Toy.webp"
              alt="Produkt"
              className="rounded-xl w-full h-auto shadow-md"
            />
          </div>

          <div className="md:w-1/2 w-full space-y-5">
            <h3 className="text-3xl font-bold text-[--text-dark]">Produktnamn</h3>
            <p className="text-xl font-semibold text-[--primary-color]">
              100 kr <s className="ml-2 text-gray-400 text-base">130 kr</s>
            </p>
            <p className="text-[--text-light]">Det här är en produktbeskrivning.</p>

            <div className="space-y-1">
              <p><strong>Kategori:</strong> Träleksaker</p>
              <p><strong>Färg:</strong> Flerfärgad</p>
              <div className="flex gap-2 items-center">
                <strong>Betyg:</strong>
                <RatingStars rating={4} />
              </div>
            </div>
            <button className="btn-primary px-6 py-3 rounded-md font-medium">
  Lägg till i kundvagnen
</button>



          </div>
        </div>
      </section>

      <section className="section__container mt-10">
        <h4 className="text-xl font-semibold text-[--text-dark] mb-4">Recensioner</h4>
        <p className="text-[--text-light]">Här visas användarrecensioner.</p>
      </section>
    </>
  );
};

export default SingleProduct;
