import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import productRouter from './routes/product.js'
import userRouter from './routes/users.js'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'
import __direname from './utils/index.js';
import nodemailer from 'nodemailer';
import axios from 'axios';
import 'dotenv/config';

const app= express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

// DATABASE MONGOOSE
mongoose.connect(
    process.env.MONGO_URL
)

app.get('/', (req,res) => {
    res.send('app corriendo')
})

// MULTER
const storage = multer.diskStorage({
    destination: 'upload/images',
    filename: (req,file, cb) =>{
        return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})

// UPLOAD ENDPOINT FOR IMAGES
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req,res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

// SWAGGER
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
        title: 'Documento Swagger',
        description: 'Documentación de la API',
        },
    },
    apis: [`${__direname}/docs/**/*.yaml`],
}; 

// MAIL
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: 'tomasbolotnicoff@gmail.com',
        pass: 'OMg3rxqZKFcsLmV5'
    }
});

app.get('/mail', async (req,res) => {
    try {
        const apiResponse = await axios.get('http://localhost:4000/api/products/allproducts');
        const apiData = apiResponse.data;
        const message = {
            from: 'tomasbolotnicoff@gmail.com',
            to: 'tomasbolotnicoff@gmail.com',
            subject: 'Message title',
            text: 'Plaintext version of the message',
            html: `<p>Tu compra ha sido realizada. Datos de la API: ${JSON.stringify(apiData)}</p>`,
        };

        await transporter.sendMail(message);
        res.send('Correo enviado correctamente');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo');
    }
})

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs' , swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

app.listen(PORT, (error) => {
    if(!error){
        console.log('Servidor corriendo en puerto ' + PORT)
    } else{
        console.log('Error:' +error)
    }
})