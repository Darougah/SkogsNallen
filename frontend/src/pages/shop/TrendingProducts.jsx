import React, { useState } from 'react';
import ProductCards from './ProductCards';
import products from "../../data/products.json";

function TrendingProducts() {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setVisibleProducts(prevCount => prevCount + 4);
  };

  return (
    <section className='section__container product__container'>
      <h2 className='section__header'>Trending Products</h2>
      <p className='section__subheader'>
        Utforska våra mest populära produkter! Perfekta för dig som vill ha det senaste och bästa.
      </p>

      {/* Display only the visible number of products */}
      <ProductCards products={products.slice(0,visibleProducts)} />

      {/* load more */}

      <div className='product__btn'>
        {
          visibleProducts < products.length && (
            <button className='btn' onClick={loadMoreProducts}>Se mer</button>
          )
        }

      </div>
    </section>
  );
}

export default TrendingProducts;
