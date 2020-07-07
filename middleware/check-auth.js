const jwt = require('jsonwebtoken') 
 
 
 module.exports = (req, res, next) => {
     console.log(req)
     try{
         const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
     } catch (error) {
         return res.status(401).json({
             message: 'Auth failed',
             suggestion:'Login/SignUp First or enter a valid token in the header',
             error: error

         })
     }
     
    
 }