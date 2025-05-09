import React, { useState } from 'react';
import ProductCards from './ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

function TrendingProducts() {
  const { data, error, isLoading } = useFetchAllProductsQuery();
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  const products = data?.products || [];

  return (
    <section className='section__container product__container'>
      <h2 className='section__header'>Trendiga Produkter</h2>
      <p className='section__subheader'>
        Utforska våra mest populära produkter! Perfekta för dig som vill ha det senaste och bästa.
      </p>

      {isLoading && <p>Laddar produkter...</p>}
      {error && <p>Något gick fel vid hämtning av produkter.</p>}

      {!isLoading && !error && (
        <>
          <ProductCards products={products.slice(0, visibleProducts)} />
          {visibleProducts < products.length && (
            <div className='product__btn'>
              <button className='btn' onClick={loadMoreProducts}>
                Se mer
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default TrendingProducts;
