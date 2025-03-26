import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from "../../data/products.json";
import ProductCards from '../shop/ProductCards';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (categoryName) {
            const formattedCategory = decodeURIComponent(categoryName.toLowerCase()); 
            const filtered = products.filter((product) =>
                product.category.toLowerCase() === formattedCategory
            );
            setFilteredProducts(filtered);
        }
    }, [categoryName]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section className='section__container bg-[#d4edda]'>
                <h2 className='section__header capitalize'>{categoryName}</h2>
                <p className='section__subheader'>Upptäck vårt breda utbud av leksaker i olika kategorier.</p>
            </section>

            <div className='section__container'>
                {filteredProducts.length > 0 ? (
                    <ProductCards products={filteredProducts} />
                ) : (
                    <p className="text-center text-gray-500">Inga produkter hittades i denna kategori.</p>
                )}
            </div>
        </>
    );
};

export default CategoryPage;
