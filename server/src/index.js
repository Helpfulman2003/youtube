const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const routes = require('./routers');
const app = express();
const port = process.env.PORT || 3002;

app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  credentials: true,
}));
routes(app);

// error handler
app.use((err, req, res, next) => {
  const status = err.status ||  500
  const message = err.status || 'Something went wrong!'
  return res.status(status).json({
    success: false,
    status,
    message
  })
})

const URL = process.env.MONGODB;

const connectDB = async () => {
  try {
    await mongoose.connect(
      URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB();

app.listen(port, () => {
  console.log('Server is running on port:', port);
});