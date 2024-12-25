const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require('cors');
const redis = require('./config/redis')

const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(cookieParser());

// import routes
const userRouter = require("./routes/userRoutes");
const movieRouter = require('./routes/movieRoutes')

// route decleration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", movieRouter)



module.exports = { app }