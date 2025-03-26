import React, { useState } from 'react';
import productsData from "../../data/products.json";
import ProductCards from '../shop/ProductCards';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(productsData);

    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === '') {
            setFilteredProducts(productsData); 
        } else {
            const filtered = productsData.filter(product => 
                product.name.toLowerCase().includes(query) 
            );
            setFilteredProducts(filtered);
        }
    };

  
    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(productsData); 
        } else {
            const filtered = productsData.filter(product => 
                product.name.toLowerCase().includes(searchQuery)
            );
            setFilteredProducts(filtered);
        }
    };

    return (
        <>
     
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Sök Leksaker</h2>
                <p className='section__subheader'>Upptäck vårt breda utbud av leksaker för alla åldrar och intressen.</p>
            </section>

            <section className='section__container'>
                <div className="search-container">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="search-bar"
                        placeholder="Sök efter leksaker..." 
                    />

                    <button 
                        onClick={handleSearch}
                        className="search-button">
                        Sök
                    </button>
                </div>

                {filteredProducts.length > 0 ? (
                    <ProductCards products={filteredProducts}/>
                ) : (
                    <p className="text-center text-gray-500">Inga produkter matchade din sökning.</p>
                )}
            </section>
        </>
    );
};

export default Search;
