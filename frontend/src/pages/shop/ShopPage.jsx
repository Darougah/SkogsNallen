import React, { useEffect, useState } from 'react';
import productsData from "../../data/products.json";
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';

const filters = {
  categories: ['all', 'gosedjur', 'tra-leksaker', 'pussel-bygg', 'spel-pyssel'],
  colors: ['all', 'svart', 'röd', 'blå', 'grön', 'rosa', 'flerfärgad'],
  priceRanges: [
    { label: 'under 50 kr', min: 0, max: 50 },
    { label: '50 kr - 100 kr', min: 50, max: 100 },
    { label: '100 kr - 150 kr', min: 100, max: 150 },
    { label: '150 kr och över', min: 150, max: Infinity },
  ]
};

const ShopPage = () => {
  const [products, setProducts] = useState(productsData || []);
  const [filtersState, setFilterState] = useState({
    category: 'all',
    color: 'all',
    priceRange: ''
  });

  const applyFilters = () => {
    let filteredProducts = [...productsData]; 

    if (filtersState.category !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase() === filtersState.category.toLowerCase()
      );
    }


    if (filtersState.color !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.color.toLowerCase() === filtersState.color.toLowerCase()
      );
    }

    if (filtersState.priceRange) {
      const [minPrice, maxPrice] = filtersState.priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(product => {
        const productPrice = parseInt(product.price.replace(' kr', ''), 10);
        return productPrice >= minPrice && productPrice <= maxPrice;
      });
    }

    setProducts(filteredProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [filtersState]);

  const clearFilters = () => {
    setFilterState({
      category: 'all',
      color: 'all',
      priceRange: ''
    });
  };

  return (
    <>
      <section className='section__container bg-[#28a745]'>
        <h2 className='section__header capitalize'>Shop Page</h2>
        <p className='section__subheader'>Upptäck vårt breda utbud av leksaker i olika kategorier.</p>
      </section>

      <section className='section__container'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
          <ShopFiltering 
            filters={filters} 
            filtersState={filtersState} 
            setFilterState={setFilterState} 
            clearFilters={clearFilters}
          />

          <div>
            <h3 className='text-xl font-medium mb-4'>Produkter Tillgängliga ({products.length})</h3>
            <ProductCards products={products} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
