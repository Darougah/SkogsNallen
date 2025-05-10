import React, { useState, useEffect } from 'react';
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const {
    data: { products = [] } = {},
    isLoading,
    isError,
    error,
  } = useFetchAllProductsQuery({
    category: '',
    color: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
    limit: 1000, 
  });

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <>
      <section className='section__container bg-[#d4edda]'>
        <h2 className='section__header capitalize'>Sök Leksaker</h2>
        <p className='section__subheader'>
          Upptäck vårt breda utbud av leksaker för alla åldrar och intressen.
        </p>
      </section>

      <section className='section__container'>
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
            placeholder="Sök efter leksaker eller kategori..."
          />
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Laddar produkter...</p>
        ) : isError ? (
          <p className="text-center text-red-500">
            Fel vid hämtning av produkter: {error?.message}
          </p>
        ) : filteredProducts.length > 0 ? (
          <ProductCards products={filteredProducts} />
        ) : (
          <p className="text-center text-gray-500">Inga produkter matchade din sökning.</p>
        )}
      </section>
    </>
  );
};

export default Search;
