const express = require("express");
const Products = require("../products/products.model");
const Reviews = require("./reviews.model");
const router = express.Router();

// POSTA en ny recension
router.post("/post-review", async (req, res) => {
  try {
    const { comment, rating, productId, userId } = req.body;

    if (!comment || !rating || !productId || !userId) {
      return res.status(400).send({ message: "Alla fält är obligatoriska" });
    }

    const existingReview = await Reviews.findOne({ productId, userId });

    if (existingReview) {
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      const newReview = new Reviews({ comment, rating, productId, userId });
      await newReview.save();
    }

    const reviews = await Reviews.find({ productId });

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      const product = await Products.findById(productId);
      if (!product) {
        return res.status(404).send({ message: "Produkten hittades inte" });
      }

      product.rating = averageRating;
      await product.save({ validateBeforeSave: false });
    }

    res.status(200).send({
      message: "Recensionen har sparats",
      reviews,
    });
  } catch (error) {
    console.error("Fel vid postning av recension", error);
    res.status(500).send({ message: "Misslyckades med att posta recensionen" });
  }
});

module.exports = router;
