import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import ProductCards from '../shop/ProductCards';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);

  const {
    data: { products = [] } = {},
    error,
    isLoading
  } = useFetchAllProductsQuery({
    category: decodedCategory.toLowerCase()
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className='section__container bg-[#d4edda]'>
        <h2 className='section__header capitalize'>{decodedCategory}</h2>
        <p className='section__subheader'>Upptäck vårt breda utbud av leksaker i denna kategori.</p>
      </section>

      <div className='section__container'>
        {isLoading ? (
          <p className="text-center">Laddar produkter...</p>
        ) : error ? (
          <p className="text-center text-red-500">Kunde inte hämta produkter.</p>
        ) : products.length > 0 ? (
          <ProductCards products={products} />
        ) : (
          <p className="text-center text-gray-500">Inga produkter hittades i denna kategori.</p>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
