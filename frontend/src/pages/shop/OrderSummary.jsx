import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { getBaseURL } from '../../utils/baseURL';

const OrderSummary = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const products = useSelector((store) => store.cart.products);
  const { selectedItems, totalPrice, tax, taxRate, grantTotal } = useSelector((store) => store.cart);

  const handleClearCart = ()=>{
    dispatch(clearCart())
  }

//payment integration
const makePayment = async(e)=>{
const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK)
const body = {
  products: products,
  userId:user?.id
}
const headers ={
  "Content-Type": "application/json"
}

const response = await fetch (`${getBaseURL()}/api/orders/create-checkout-session`, {
  method:"POST",
  headers: headers,
  body:JSON.stringify(body)
})
console.log(response)
const session = await response.json()
console.log("session", session)

const result = stripe.redirectToCheckout({
  sessionId:session.id
})
console.log("Result:",result)
if(result.error){
  console.log("Error:",result.error)
}
}

  return (
    <div className='bg-[#e6f4ea] mt-6 rounded-xl shadow-lg text-base border border-green-200'>
      <div className='px-6 py-6 space-y-5'>
        <h2 className='text-2xl font-bold text-black border-b pb-3'>
          🧾 Orderöversikt
        </h2>

        <div className='space-y-2 text-gray-700 text-[15px]'>
          <p><span className='font-medium'>Valda produkter:</span> {selectedItems}</p>
          <p><span className='font-medium'>Totalt pris:</span> {totalPrice.toFixed(2)} kr</p>
          <p><span className='font-medium'>Moms ({taxRate * 100}%):</span> {tax.toFixed(2)} kr</p>
        </div>

        <div className='mt-4 text-lg font-bold text-black border-t pt-3'>
          Totalt att betala:
          <span className='block text-green-700 text-2xl mt-1'>{grantTotal.toFixed(2)} kr</span>
        </div>

        <div className='mt-6 flex flex-col md:flex-row gap-4'>
          <button onClick={(e)=>{
            e.stopPropagation();
            handleClearCart();
          }} className='bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-md flex items-center justify-center gap-2 w-full shadow-sm'>
            <i className="ri-delete-bin-fill"></i>
            <span>Rensa kundvagn</span>
          </button>

          <button 
          onClick={(e)=>{
            e.stopPropagation();
            makePayment()
          }}
          className='bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-md flex items-center justify-center gap-2 w-full shadow-sm'>
            <i className="ri-bank-card-2-line"></i>
            <span>Gå till betalning</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary;