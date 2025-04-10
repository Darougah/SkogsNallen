// import React from 'react';
// import OrderSummary from './OrderSummary';

// const CartModal = ({ products, isOpen, onClose }) => {
//   return (
//     <div
//       className={`fixed z-[1000] inset-0 bg-black/40 transition-opacity ${
//         isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//       }`}
//       style={{ transition: 'opacity 300ms' }}
//     >
//       <div className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-auto transition-transform ${isOpen ? 'translate-x-0': 'translate-x-full'}`}
//       style={{transition:'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)'}}
//       >
// <div className='p-4 mt-4'>
//   <div className='flex justify-between item-center mb-4'>
//   <h4 className='text-xl font-semibold'>Your Cart</h4>
//   <button 
//   onClick={()=> onClose()}
//   className='text-gray-600 hover:text-gray-900'>
//     <i className="ri-xrp-line bg-black p-1 text-white"></i></button>
//   </div>
//   {/* cart details */}
//   <div className='cart-items'>
//     {
//       products.length === 0 ? (<div>Your cart is empty</div>) : (
// products.map((item, index)=>(
//   <div key={index} className='flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4'>
//     <div className='flex items-center'>
//       <span className='mr-4 px-1 bg-primary text-white rounded-full'>0{index + 1}</span>
//       <img src={item.image} alt="" className='size-12 object-cover mr-4'/>
//       <div>
//         <h5 className='text-lg font-medium'>{item.name}</h5>
//         <p className='text-gray-600 text-sm'>{Number(item.price).toFixed(2)}kr</p>
//       </div>
//       <div className='flex flex-row md:justify-start justify-end items-center mt-2'>
//         <button className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-8'>-</button>
//         <span className='px-2 text-center mx-1'>{item.quantity}</span>
//         <button className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'>+</button>
//         <div className='ml-5'>
//           <button className='text-red-500 hover:text-red-800 mr-4'>Remove</button>
//         </div>
//       </div>
//     </div>
//   </div>
// ))
//       )
//     }
//   </div>

// {/* calculate */}
// {
//   products.length > 0 && (
//     <OrderSummary />
//   )
// }
// </div>
//       </div>
//     </div>
//   );
// };

// export default CartModal;

import React from 'react';
import OrderSummary from './OrderSummary';

const CartModal = ({ products, isOpen, onClose }) => {
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
            <button 
              onClick={onClose}
              className='text-gray-600 hover:text-gray-900'
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          {/* cart details */}
          <div className='cart-items'>
            {products.length === 0 ? (
              <div className='text-gray-600 text-center mt-10'>Din kundvagn är tom</div>
            ) : (
              products.map((item, index) => (
                <div
                  key={index}
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
                      <p className='text-gray-500'>{Number(item.price.replace(/[^0-9.-]+/g, '')).toFixed(2)} kr</p>
                    </div>
                  </div>

                  <div className='flex flex-row items-center mt-3 md:mt-0'>
                    <button className='w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'>-</button>
                    <span className='px-3 text-black'>{item.quantity}</span>
                    <button className='w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'>+</button>
                    <button className='text-red-500 hover:text-red-800 ml-4 text-sm'>Ta bort</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* calculation */}
          {products.length > 0 && (
            <OrderSummary />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
