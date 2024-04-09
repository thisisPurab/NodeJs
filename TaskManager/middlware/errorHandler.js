const { CustomApiError } = require("../errors/customError");

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        // console.log(err);
        return res.status(err.statusCode).json({ message: err.message });
    }
    // console.log(err);
    return res.status(500).json({ message: "something went wrong" });
};

module.exports = errorHandlerMiddleware;
