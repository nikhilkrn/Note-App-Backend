const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require ('../../env.js');


//write Auth Logic Here
function userMiddleware(req,res,next) {
    const token = req.headers.authorization;
    const words = token.split(' ');
    const jwtToken = words[1]
    const decodedToken = jwt.verify(jwtToken,JWT_SECRET , (err,decoded)=>{
        if (err) {
            return res.status(403).json({
                msg: "Your Crdential are incorrect"
            })
        } else {
            req.username = decoded.username;
            console.log(decoded.username , req.username)
            next()
        }
    });
    
}

module.exports = userMiddleware;