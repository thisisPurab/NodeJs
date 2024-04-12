const JWT = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new CustomAPIError(
            "please provide email and password",
            StatusCodes.BAD_REQUEST
        );
    }

    const date = new Date().getDate();
    const id = date + username;

    const token = JWT.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    res.status(StatusCodes.OK).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
    randomNumber = Math.floor(Math.random() * 100);
    res.status(StatusCodes.OK).json({
        msg: `hello ${req.user.username}`,
        secret: randomNumber,
    });
};

module.exports = { login, dashboard };
