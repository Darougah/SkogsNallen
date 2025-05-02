import React from 'react';
import OrderSummary from './OrderSummary';
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const CartModal = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, id }));
  };

  const handleRemove =(e,id)=> {
    e.preventDefault()
    dispatch(removeFromCart({id}))
  }
  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black/40 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ transition: 'opacity 300ms' }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-auto transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transition: 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)' }}
      >
        <div className='p-4 mt-4'>
          <div className='flex justify-between items-center mb-4'>
            <h4 className='text-xl font-semibold text-black'>Din kundvagn</h4>
            <button onClick={onClose} className='text-gray-600 hover:text-gray-900'>
              <i className='ri-close-line text-2xl'></i>
            </button>
          </div>

          {/* Cart details */}
          <div className='cart-items'>
            {products.length === 0 ? (
              <div className='text-gray-600 text-center mt-10'>Din kundvagn är tom</div>
            ) : (
              products.map((item, index) => (
                <div
                  key={item._id}
                  className='flex flex-col md:flex-row md:items-center md:justify-between shadow-md rounded-lg md:p-4 p-2 mb-4 bg-[#f9f9f9]'
                >
                  <div className='flex items-center gap-4'>
                    <span className='text-sm px-2 py-1 bg-primary text-white rounded-full'>0{index + 1}</span>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-16 h-16 object-cover rounded-md border'
                    />
                    <div className='flex flex-col text-sm'>
                      <h5 className='font-semibold text-black'>{item.name}</h5>
                      <p className='text-gray-500'>
                      {Number(item.price).toFixed(2)} kr
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-row items-center mt-3 md:mt-0'>
                    <button
                      onClick={() => handleQuantity('decrement', item._id)}
                      className='w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'
                    >
                      -
                    </button>
                    <span className='px-3 text-black'>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity('increment', item._id)}
                      className='w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'
                    >
                      +
                    </button>
                    <button
                    onClick={(e)=> handleRemove(e,item._id)}
                    className='text-red-500 hover:text-red-800 ml-4 text-sm'>Ta bort</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          {products.length > 0 && <OrderSummary />}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
