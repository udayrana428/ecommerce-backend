// import dotenv from 'dotenv';
const dotenv=require('dotenv')



dotenv.config();
module.exports= {
  // mongodb+srv://udayrana428:surendra@cluster0.vd9kmpq.mongodb.net/ecommerce  ecomcluster
  // mongodb+srv://udayrana428:surendra@cluster0.px7ut.mongodb.net/ecommerce 0 cluster
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://udayrana428:surendra@cluster0.px7ut.mongodb.net/ecommerce',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
// export default {
//   // mongodb+srv://udayrana428:surendra@cluster0.vd9kmpq.mongodb.net/ecommerce  ecomcluster
//   // mongodb+srv://udayrana428:surendra@cluster0.px7ut.mongodb.net/ecommerce 0 cluster
//   PORT: process.env.PORT || 5000,
//   MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://udayrana428:surendra@cluster0.px7ut.mongodb.net/ecommerce',
//   JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
//   PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
//   accessKeyId: process.env.accessKeyId || 'accessKeyId',
//   secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
// };
