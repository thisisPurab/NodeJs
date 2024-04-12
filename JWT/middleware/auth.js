const JWT = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const authenticationMiddleware = async (req, res, next) => {
    // console.log(req.hearders);
    const authHaeder = req.headers.authorization;
    // console.log(authHaeder);

    if (!authHaeder || !authHaeder.startsWith("Bearer ")) {
        // console.log("hii");
        throw new CustomAPIError("No token provided", StatusCodes.UNAUTHORIZED);
    }

    const token = authHaeder.split(" ")[1];
    // console.log(token);

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        const { id, username } = decoded;
        req.user = { id, username };
        //
    } catch (error) {
        throw new CustomAPIError(
            "Authorization Failed",
            StatusCodes.UNAUTHORIZED
        );
    }
    next();
};

module.exports = authenticationMiddleware;
