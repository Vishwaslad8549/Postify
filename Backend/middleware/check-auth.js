const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    try {
        console.log(process.env.Mongo_DB_PW);
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,process.env.JWT_KEY )
        next()
    } catch
    {
        res.status(401).json({ message: "Unauthorized" })
    }
}