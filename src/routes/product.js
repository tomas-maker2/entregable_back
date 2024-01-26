import express from 'express';
import { addToCart, addproduct, getAllProducts, getById, getCart, newCollections, popularWomen, removeAllFromCart, removeFromCart, removeProduct } from '../controllers/product.controller.js';
import { fetcheUser } from '../middleware/index.js';

const router = express.Router();

// ADD PRODUCTS
router.post('/addproduct', addproduct)

// DELETE 
router.post('/removeProduct', removeProduct)

// GET ALL PRODCUTS
router.get('/allproducts', getAllProducts)

// GET PRODUCT BY ID
router.get('/find/:id', getById)

router.get('/newcollections', newCollections)

router.get('/popularwomen', popularWomen)

// ADD TO CART
router.post('/addtocart', fetcheUser , addToCart)

// REMOVE FROM CART
router.post('/removefromcart', fetcheUser, removeFromCart)

// REMOVE ALL FROM CART
router.post('/removeallfromcart', fetcheUser,removeAllFromCart )

// GET CART
router.post('/getcart', fetcheUser, getCart)



export default router