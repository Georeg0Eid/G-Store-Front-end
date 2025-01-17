const express = require('express');
const router = express.Router();
const productController = require('../Controllers/product.controller');
const upload = require('../config/multerConfig');
const auth = require("../Controllers/user.controller")


router.get('/',productController.getProducts);
router.post('/createProduct', auth.authenticate ,upload.single('productImage'),productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/:id",auth.authenticate, upload.single('productImage'), productController.updateProduct);
// router.delete("/:id",auth.authenticate, productController.deleteProduct);



module.exports = router;