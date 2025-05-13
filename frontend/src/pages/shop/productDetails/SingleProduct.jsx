import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingStars from '../../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import { ReviewsCard } from '../reviews/ReviewsCard';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details...</p>;

  return (
    <>
      <section className='section__container bg-[#d4edda]'>
        <h2 className='section__header capitalize'>Produktdetalj</h2>
        <div className='section__subheader space-x-2'>
          <span className='hover:text-primary'><Link to="/">Hem</Link></span>
          <i className="ri-arrow-right-wide-line"></i>
          <span className='hover:text-primary'><Link to="/shop">Butik</Link></span>
          <i className="ri-arrow-right-wide-line"></i>
          <span className='hover:text-primary'>{singleProduct.name}</span>
        </div>
      </section>

      <section className='section__container mt-8'>
        <div className='flex flex-col items-center md:flex-row gap-8'>
          <div className='md:w-1/2 w-full'>
            <img src={singleProduct?.image} alt="" className='rounded-md w-full h-auto' />
          </div>
          <div className='md:w-1/2 w-full'>
            <h3 className='text-2xl font-semibold mb-4'>{singleProduct?.name}</h3>
            <p className="text-xl font-semibold text-[--primary-color]">
              {singleProduct?.price} kr{' '}
              {singleProduct?.oldPrice && (
                <s className="text-red-600">{singleProduct.oldPrice} kr</s>
              )}
            </p>
            <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>

            <div className='flex flex-col space-y-2'>
              <p><strong>Kategori:</strong> {singleProduct?.category}</p>
              <p><strong>Färg:</strong> {singleProduct?.color}</p>
              <div className='flex gap-1 items-center'>
                <strong>Betyg: </strong>
                <RatingStars rating={singleProduct?.rating} />
              </div>
              <button
                onClick={() => handleAddToCart(singleProduct)}
                className="btn">
                Lägg till i kundvagnen
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='section__container mt-8'>
        <ReviewsCard productReviews={productReviews} />
      </section>
    </>
  );
};

export default SingleProduct;