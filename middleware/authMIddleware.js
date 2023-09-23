//Custom middleware function to verify whether a user is logged in or not.

const config = require('config');
const jwt = require('jsonwebtoken');


function auth(req,res, next){
    //We get the token from the request’s header part named ‘x-auth-token’.
    const token = req.header('x-auth-token');

   

    //Check for token
    if(!token){
        res.status(400).json({msg: 'No token, authorization failed'});
    }

    try{
        //If there was no token, then we will verify the token 
        //and then send the decoded variable as the response.

        //Verify Token
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        //Add user from payload
        req.user = decoded;
        //We then use the next() function, which 
        //allows us to move on to the next middleware function.
        next()
    }
    catch(e){
        res.status(400).json({msg: 'Token is not valid'});
    }
}

module.exports = auth;