const {isTokenValid, createJWT} = require('../utils/jwt.js')
const CustomApiError = require('../errors')

const authenticateUser = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if( !token || typeof token != 'string' ) {
            throw new CustomApiError.UnauthenticatedError("Please Log In to Continue")
        }
        token = token.trim();
        if( !token.startsWith('Bearer ') ) {
            throw new CustomApiError.UnauthenticatedError("Please Log In to Continue")
        }
        token = token.split("Bearer ")[1];
        const payload = isTokenValid(token);
        if( !payload ) throw new CustomApiError.UnauthenticatedError("Please Log In to Continue")
        next();
    }catch(err) {
        throw new CustomApiError.UnauthenticatedError("Please Log In to Continue")
    }
}


module.exports = {
    authenticateUser
}