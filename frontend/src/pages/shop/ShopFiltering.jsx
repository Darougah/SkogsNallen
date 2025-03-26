import React from 'react';

const ShopFiltering = ({ filters, filtersState, setFilterState, clearFilters }) => {
  if (!filters) return null;

  return (
    <div className='space-y-5 flex-shrink-0'>
      <h3>Filtrering</h3>

      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Kategori</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className='capitalize cursor-pointer'>
            <input 
              type="radio" 
              name="category" 
              value={category}
              checked={filtersState.category === category}
              onChange={(e) => setFilterState({ ...filtersState, category: e.target.value })}
            />
            <span className='ml-1'>{category}</span>
          </label>
        ))}
      </div>

      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Färg</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color} className='capitalize cursor-pointer'>
            <input 
              type="radio" 
              name="color" 
              value={color}
              checked={filtersState.color === color}
              onChange={(e) => setFilterState({ ...filtersState, color: e.target.value })}
            />
            <span className='ml-1'>{color}</span>
          </label>
        ))}
      </div>

      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Prisintervall</h4>
        <hr />
        {filters.priceRanges.map((range) => (
          <label key={range.label} className='capitalize cursor-pointer'>
            <input 
              type="radio" 
              name="priceRange" 
              value={`${range.min}-${range.max}`}
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) => setFilterState({ ...filtersState, priceRange: e.target.value })}
            />
            <span className='ml-1'>{range.label}</span>
          </label>
        ))}
      </div>

      <button onClick={clearFilters} className='bg-primary py-1 px-4 text-white rounded'>Rensa Filter</button>
    </div>
  );
};

export default ShopFiltering;
