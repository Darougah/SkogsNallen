const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

//middleware
app.use(express.json({ limit: "25mb" }));
app.use((express.urlencoded({ limit: "25mb" })))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(
  cors({
    origin: ["https://skogsnallen-1.onrender.com", "http://localhost:5173"],
    credentials: true,
  })
);

//image upload
const uploadImage = require('./src/utils/uploadImage');

//all routes
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route')
const reviewRoutes = require('./src/reviews/reviews.router')
const orderRoutes = require('./src/orders/orders.route')
const statsRoutes = require('./src/stats/stats.route')

app.use('/api/auth',authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/reviews',reviewRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/stats', statsRoutes)
main()
  .then(() => console.log("Mongodb is successfuly connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get("/", (req, res) => {
    res.send("SkogsNallens butik körs...!");
  });
}

app.post("/uploadImage", async (req, res) => {
  try {
    const url = await uploadImage(req.body.image);
    res.send(url);
  } catch (err) {
    res.status(500).send({ message: err.message || "Bilden laddades inte upp" });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
