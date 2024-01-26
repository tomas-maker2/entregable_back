import { userModel } from "../models/user.model.js"
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';


export const signup = async(req,res) => {
    let check = await userModel.findOne({email:req.body.email});
    if(check)
    {
        return res.status(400).json({success:false, errors:"Usuario existente encontrado con el mismo mail"})
    } 
    const hashedPassword = await argon2.hash(req.body.password)
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user = new userModel({
        name:req.body.username,
        email:req.body.email,
        password:hashedPassword,
        cartData:cart,
    })
    await user.save();
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true,token});
}

export const login = async (req,res) => {
    let user = await userModel.findOne({email:req.body.email});
    if(user)
    {
        const passCompare = await argon2.verify(user.password, req.body.password)
        if(passCompare)
        {
            const data = {
                user: {
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true, token});
        } else{
            res.json({success:false,errors:'Contraseña incorrecta'});
        }
    } else{
        res.json({success:false, errors:'Email id incorrecto'})
    }
}

export const getAllUsers = async (req,res) => {
    try {
        const users = await userModel.find({});
        console.log('Users fetched');
        res.json(users);
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

export const getUsersById = async (req,res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        console.log('User found');
        res.json(user);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findByIdAndDelete(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.json({ success: true, message: 'Usuario eliminado con éxito', deletedUser: user });
    } catch (error) {
        console.error('Error al eliminar usuario por ID:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};