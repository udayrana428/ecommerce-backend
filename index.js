// import express from 'express';
const express=require('express')
// import path from 'path';

// import bodyParser from 'body-parser';
// import config from './config';
// import userRoute from './routes/userRoute';
const userRoute=require('./routes/userRoute')
// import productRoute from './routes/productRoute';
const productRoute=require('./routes/productRoute')
// import orderRoute from './routes/orderRoute';
const orderRoute=require('./routes/orderRoute')
// import uploadRoute from './routes/uploadRoute';
const uploadRoute=require('./routes/uploadRoute')
// import cors from "cors"
const cors=require('cors')
// import connectToMongo from './db';
const connectToMongo=require('./db')
const app = express()
const PORT =process.env.PORT || 5000
connectToMongo()
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
  res.send("welcome to my site")
})
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
// app.get('/api/config/paypal', (req, res) => {
//   res.send(config.PAYPAL_CLIENT_ID);
// });
if(process.env.NODE_ENV=="production"){
  app.use(express.static("client/build"))
}
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`)
})
