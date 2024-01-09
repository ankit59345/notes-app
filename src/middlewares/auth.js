const {isTokenValid, createJWT} = require('../utils/jwt.js')
const CustomApiError = require('../errors')
const pool = require('../db/database.js')

const authenticateUser = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        let customError = new CustomApiError.UnauthenticatedError("Please Log In to Continue");
        if( !token || typeof token != 'string' ) {
            throw customError
        }
        token = token.trim();
        if( !token.startsWith('Bearer ') ) {
            throw customError
        }
        token = token.split("Bearer ")[1];
        const payload = isTokenValid(token);

        if( !payload || !payload.userId ) throw customError

        const {userId} = payload;
        const [[userRow]] = await pool.query("SELECT * FROM users WHERE id=?", userId);

        if(!userRow) throw customError;

        req['user'] = userRow;

        next();
    }catch(err) {
        throw new CustomApiError.UnauthenticatedError("Please Log In to Continue")
    }
}


module.exports = {
    authenticateUser
}