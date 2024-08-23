const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


//1
dotenv.config();

//1.1
connectDB();

//2
const app = express();

//3
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//3.1
app.use("/api/auth",require("./routes/userRoutes"))
app.use("/user",require("./routes/HomeScreenRoutes"))

//r4
const PORT = process.env.PORT || 8086;

//5
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`.white.bgCyan);
});
