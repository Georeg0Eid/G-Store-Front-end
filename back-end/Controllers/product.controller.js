const productModel = require("../Models/product.model");

exports.createProduct = (req, res) => {
  const { name, category, new_price, old_price } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image not uploaded!" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;

  const newProduct = new productModel({
    id: Date.now(), // 
    name,
    category,
    image: imageUrl,
    new_price,
    old_price,
  });

  newProduct
    .save()
    .then((product) => {
      res.status(201).json({
        message: "Product created successfully!",
        product,
      });
    })
    .catch((err) => {
 
      res.status(400).json({ error: err.message });
    });
};

exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.id; 
  try {
    const product = await productModel.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, category, new_price, old_price } = req.body;
  const productId = req.params.id; 

  try {

    let imageUrl = "";
    if (req.file) {
   
      imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }

    const updatedProduct = await productModel.findOneAndUpdate(
      { id: productId },
      { name, category, new_price, old_price, image: imageUrl },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.deleteProduct = async (req, res) => {
//   const productId = req.params.id; 

//   try {
//     const deletedProduct = await productModel.findOneAndDelete({
//       id: productId,
//     });

//     if (!deletedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({
//       message: "Product deleted successfully!",
//       product: deletedProduct,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

