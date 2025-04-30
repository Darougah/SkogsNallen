const express = require('express');
const Products = require('./products.model');
const Reviews = require('../reviews/reviews.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();


//Post a product
router.post("/create-product", async(req, res)=>{
  try {
    const newProduct = new Products({...req.body})

    const savedProduct = await newProduct.save();
    //calculate review
    const reviews = await Reviews.find({productId: savedProduct._id});
    if(reviews.length > 0 ){
      const totalRating = reviews.reduce((acc, review)=> acc + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      savedProduct.rating = averageRating;
      await savedProduct.save();
    }
    res.status(201).send(savedProduct)
  } catch (error) {
    console.error("Fel vid skapande av produkt");
    res.status(500).send({message: "Misslyckades med att skapa ny produkt"})
    
  }
})

//get all products

router.get("/", async (req,res)=>{
  try {
    const {category, color, minPrice, maxPrice, page=1, limit = 10}= req.query;
    let filter = {};
    if(category && category !== "all"){
      filter.category = category
    }
    if(color && color !== "all"){
      filter.color = color
    }
    if(minPrice && maxPrice){
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if(!isNaN(min) && !isNaN(max)){
        filter.price = {$gte:min,$lte:max}
      }
    }
const skip = (parseInt(page)-1)*parseInt(limit);

const totalProducts = await Products.countDocuments(filter);
const totalPages = Math.ceil(totalProducts / parseInt(limit));
const products = await Products.find(filter)
.skip(skip)
.limit(parseInt(limit))
.populate("author", "email")
.sort({createdAt: -1});

res.status(200).send({products,totalPages, totalProducts})



  } catch (error) {
    console.error("Fel vid hämtning av produkter");
    res.status(500).send({message: "Ett fel uppstod när produkterna skulle hämtas"})
  }
})

//get single product
router.get("/:id", async(req,res)=>{
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId).populate("author","email username");
    if(!product){
      return res.status(404).send({message: "Produkten hittades inte"})
    }
    const reviews = await Reviews.find({productId}).populate("userId","username email");
    res.status(200).send({product,reviews})
  } catch (error) {
    console.error("Fel vid hämtning av produkten");
    res.status(500).send({message: "Misslyckades med att hämta produkten"})
  }
})


// update a product
router.patch("/update-product/:id", verifyToken,verifyAdmin, async(req,res)=>{
  try {
    const productId = req.params.id;
    const updateProduct = await Products.findByIdAndUpdate(productId, {...req.body},{new:true})
    if(!updateProduct){
      return res.status(400).send({message:"Produkten hittades inte"})
    }
res.status(200).send({
  message:"Produkten uppdaterades",
  product: updateProduct
})

  } catch (error) {
    console.error("Fel vid uppdatering av produkt");
    res.status(500).send({message: "Misslyckades med att uppdatera produkten"})
  }
})


//delete a product

router.delete('/:id', async(req,res)=>{
  try {
    const productId = req.params.id;
    const deletedProduct = await Products.findByIdAndDelete(productId);

if(!deletedProduct){
  return res.status(404).send({message:"Produkten hittades inte"})
}

//Delete reviews related to product
await Reviews.deleteMany({productId:productId})

res.status(200).send({
  message:"Produkten raderades"
})

  } catch (error) {
    console.error("Fel vid radering av produkt");
    res.status(500).send({message: "Misslyckades med att radera produkten"})
  }
})


// get related products
router.get("/related/:id", async(req,res)=>{
  try {
    const {id}=req.params;
    if(!id){
      return res.status(400).send({message:"Produkt-ID krävs"})
    }
    const product = await Products.findById(id);
    if(!product){
      return res.status(404).send({message:"Produkten hittades inte"})
    }

    const titleRegex = new RegExp(
      product.name
      .split(" ")
      .filter((word)=> word.length > 1)
      .join("|"),"i"
    );

    const relatedProducts = await Products.find({
      _id:{$ne: id},
      $or:[
        {name:{$regex:titleRegex}},
    {category:product.category}
  ]
    })
    res.status(200).send(relatedProducts)
  } catch (error) {
    console.error("Fel vid hämtning av relaterade produkter");
    res.status(500).send({message: "Misslyckades med att hämta relaterade produkter"})
  }
})

module.exports = router