const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60*15});
    return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  createJWT,
  isTokenValid
};
