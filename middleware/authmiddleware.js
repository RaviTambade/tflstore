const jwt = require("jsonwebtoken");
const SECRET_KEY = "MY_SECRET_KEY_12345";

exports.verifyToken = (req, res, next) => {

    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send({ message: "Token Missing" });
    }

    token = token.replace("Bearer ", "");

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized or Token Expired" });
        }

        req.user = decoded;
        next();
    });
};
