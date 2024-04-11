require("dotenv").config();
require("express-async-errors");

//setting up express app
const express = require("express");
const app = express();

//controllers
const productController = require("./controllers/productController");

//middleware
const notFoundMiddleware = require("./middleware/not_found");
const errorHandlerMiddleware = require("./middleware/error_handler");

const connectDB = require("./db/connect");

//routes
const productRouter = require("./routes/productRoutes");

//builtin middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Home page</h1><a href='/api/v1/products'>products page</a>");
});

app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server is live on port: ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
