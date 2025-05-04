const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
  orderId:String, 
  products: [
    {
      productId:{type:String, required:true},
      quantity: {type:Number, required:true},
    }
  ],
  amount:Number,
  email: {type:String, required:true},
  status: {
    type: String,
    enum: ["Mottagen", "Behandlas", "Skickad", "Klar"],
    default:"Mottagen"
  }
}, {timestamps:true})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;