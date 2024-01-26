import mongoose from "mongoose";

const UsersCollection = 'users2';

const UsersSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const userModel = mongoose.model(UsersCollection,UsersSchema);

export {userModel}