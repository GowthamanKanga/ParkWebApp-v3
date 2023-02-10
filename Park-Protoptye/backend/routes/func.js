const jwt = require("jsonwebtoken")

function verifytoken(req,res,next){
    if( req.headers['authorization'] !== undefined){
        const   bearerHeader = req.headers['authorization']
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]
        jwt.verify(bearerToken,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                res.status(403).send({ status : false, message: "Invalid JWT token"})
            }else{
                req.user = user;
                next()
            }
        })
    }else{
        res.status(403).send("Please provide Valid JWT token")
    }
}


exports.verifytoken = verifytoken
