const express = require("express");
const BlogPost = require("../models/blogPost");

const router = express.Router();

// Routes
router.get("/", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => console.log(error));
});

router.post("/save", (req, res) => {
  const data = req.body;
  const newBlogPost = new BlogPost(data);

  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: `Error: ${error}` });
      return;
    }
    return res.json({ msg: "We received your post!" });
  });
});

module.exports = router;
