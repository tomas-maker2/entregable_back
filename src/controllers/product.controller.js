import { productModel } from "../models/product.model.js"
import { userModel } from "../models/user.model.js";


export const addproduct = async (req,res) => {
    let products = await productModel.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }else{
        id=1;
    }

    const product = new productModel({
        id: id,
        name:req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log('Guardado');
    res.json({
        success: true,
        name: req.body.name,
    })
}

export const removeProduct = async (req,res) => {
    await productModel.findOneAndDelete({id:req.body.id});
    console.log('Removido');
    res.json({
        success: true,
        name: req.body.name,
    })
}

export const getAllProducts = async (req,res) =>{
    let products = await productModel.find({})
    console.log('Todos los productos encontrados')
    res.send(products)
}

export const newCollections = async(req,res) => {
    let products = await productModel.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log('NewCollection Encontrado');
    res.send(newcollection);
}

export const popularWomen = async (req,res) => {
    let products = await productModel.find({category:'women'});
    let popular_in_women = products.slice(0,4);
    console.log('Populares en mujeres encontrados');
    res.send(popular_in_women);
}

export const addToCart = async (req,res) => {
    console.log('Agregado', req.body.itemId);
    let userData = await userModel.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await userModel.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send('Agregado')
}

export const removeFromCart = async (req,res) => {
    console.log('Removido', req.body.itemId);
    let userData = await userModel.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await userModel.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send('Removido')
}

export const getCart = async (req,res) => {
    console.log('Obtener Carrito')
    let userData = await userModel.findOne({_id:req.user.id});
    res.json(userData.cartData);
} 

export const getById = async (req,res) => {
    try {
        const product = await productModel.findById(req.params.id);
        console.log('Producto encontrado');
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}