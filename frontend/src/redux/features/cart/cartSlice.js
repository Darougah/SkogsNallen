import { createSlice } from '@reduxjs/toolkit'

const initialState = {
products:[],
selectedItems: 0,
totalPrice:0,
tax:0,
taxRate:0.05,
grantTotal:0,
}

const cartSlice = createSlice({
name:'cart',
initialState,
reducers:{
  addToCart: (state, action)=> {
const isExist = state.products.find((product)=> product._id === action.payload._id);
if(!isExist){
  state.products.push({...action.payload,quantity:1})

} else{
  console.log("items already added")
}
state.selectedItems = setSelectedItems(state);
state.totalPrice = setTotalPrice(state);
state.tax = setTax(state)
state.grantTotal = setGrandTotal(state)
  },
  updateQuantity: (state, action) => {
    const { id, type } = action.payload;
    state.products = state.products.map((product) => {
      if (product._id === id) {
        if (type === 'increment') {
          product.quantity += 1;
        } else if (type === 'decrement' && product.quantity > 1) {
          product.quantity -= 1;
        }
      }
      return product;
    });
  
    state.selectedItems = setSelectedItems(state);
    state.totalPrice = setTotalPrice(state);
    state.tax = setTax(state);
    state.grantTotal = setGrandTotal(state);
  },
  removeFromCart: (state,action)=>{
    state.products =state.products.filter((product)=>product._id !== action.payload.id);
    state.selectedItems = setSelectedItems(state);
state.totalPrice = setTotalPrice(state);
state.tax = setTax(state)
state.grantTotal = setGrandTotal(state);
  },
  clearCart:(state)=> {
    state.products=[];
    state.selectedItems=0;
    state.totalPrice = 0;
    state.tax = 0;
    state.grantTotal =0;
  }
}
})

export const setSelectedItems = (state) => state.products.reduce((total,product)=>{
  return Number(total+product.quantity)
},0)

export const setTotalPrice =(state)=>state.products.reduce((total,product)=>{
  return Number(total+product.quantity* product.price)
},0)

export const setTax =(state)=>setTotalPrice(state) * state.taxRate

export const setGrandTotal =(state) =>{
  return setTotalPrice(state) + setTotalPrice(state) * state.taxRate
}

export const {addToCart, updateQuantity, removeFromCart , clearCart} = cartSlice.actions;
export default cartSlice.reducer