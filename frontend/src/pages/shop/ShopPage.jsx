import React, {  useState } from 'react';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
  categories: [
    'alla',
    'gosedjur',
    'trä-leksaker',
    'pussel-bygg',
    'spel-pyssel',
    'fordon',
    'böcker',
    'babykläder'
  ],
  colors: [
    'alla',
    'brun',
    'vit',
    'blå',
    'röd',
    'grön',
    'rosa',
    'ljusblå',
    'flerfärgad'
  ],
  priceRanges: [
    { label: 'Under 50 kr', min: 0, max: 50 },
    { label: '50 kr - 100 kr', min: 50, max: 100 },
    { label: '100 kr - 150 kr', min: 100, max: 150 },
    { label: '150 kr och över', min: 150, max: Infinity }
  ]
};

const ShopPage = () => {
  const [filtersState, setFilterState] = useState({
    category: 'alla',
    color: 'alla',
    priceRange: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);

  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split('-').map(Number);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== 'alla' ? category : '',
    color: color !== 'alla' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: ProductsPerPage,
  });

  const clearFilters = () => {
    setFilterState({
      category: 'alla',
      color: 'alla',
      priceRange: ''
    });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return <div>Laddar produkter...</div>;
  if (error) return <div>Fel vid inladdning av produkter</div>;

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className='section__container bg-[#d4edda]'>
        <h2 className='section__header capitalize'>Butik</h2>
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
            <h3 className='text-xl font-medium mb-4'>
              Visar {startProduct} till {endProduct} av {totalProducts} produkter
            </h3>
            <ProductCards products={products} />

            <div className='mt-6 flex justify-center'>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className='px-4 py-2 bg-[#d4edda] text-gray-700 rounded-md mr-2'
              >
                Föregående
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-[#d4edda] text-gray-700'} rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className='px-4 py-2 bg-[#d4edda] text-gray-700 rounded-md ml-2'
              >
                Nästa
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
