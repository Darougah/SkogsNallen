
const express = require('express');
const Order = require('./orders.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// post a product
router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'sek',
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.FRONTEND_URL}/cancel`,

    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Fel vid skapande av session", error);
    res.status(500).send({ message: "Misslyckades med att skapa session" });
  }
});

// get all products
router.post("/confirm-payment", async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

    const paymentIntentId = session.payment_intent.id;
    let order = await Order.findOne({ orderId: paymentIntentId });

    if (!order) {
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product,
        quantity: item.quantity,
      }));

      const amount = session.amount_total / 100;

      order = new Order({
        orderId: paymentIntentId,
        amount,
        products: lineItems,
        email: session.customer_details.email,
        status: session.payment_intent.status === "succeeded" ? "Mottagen" : "Misslyckad",
      });
    } else {
      order.status = session.payment_intent.status === "succeeded" ? "Mottagen" : "Misslyckad";
    }

    await order.save();
    res.json({ order });

  } catch (error) {
    console.error("Fel vid bekräftelse av betalning", error);
    res.status(500).send({ message: "Misslyckades med att bekräfta betalning" });
  }
});


//get order by email adress
router.get('/:email', async(req,res)=>{
  const email =req.params.email;
  if(!email){
    return res.status(400).json({message:"Email is required"})
  }try {
    const orders = await Order.find({email:email});
    if(orders.length === 0 || !orders){
      return res.status(400).json({orders: 0 ,message:"No orders found for this email"})
    }
res.status(200).send({orders})

  } catch (error) {
    console.error("Error fetching order by email", error);
    res.status(500).json({message:"Error fetching order by email"})
  }
})


// get order by id
router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json( order );
  } catch (error) {
    console.error("Error fetching orders by user id", error);
    res.status(500).json({ message: "Error fetching orders by user id" });
  }
});


// get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found", orders: [] });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).json({ message: "Error fetching all orders" });
  }
});


// update order status
router.patch('/update-order-status/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("Error updating order status", error);
    res.status(500).json({ message: "Error updating order status" });
  }
});


//Delete order
router.delete('/delete-order/:id', async (req, res) => {
  try {
      const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });

  } catch (error) {
    console.error("Error deleting order ", error);
    res.status(500).json({ message: "Failed to delete order",order: deletedOrder });
  }
})

module.exports = router;
