const jsonwebtoken = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Pasa el objeto usuario
 * @param {*} user 
 * @returns 
 */
const tokenSign = async (user) => {
    const sign = jsonwebtoken.sign(
        {
            _id: user._id,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: '2h',
        }
    );

    return sign;
}

/**
 * Pasa el token de sesion el JWT
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        const token = jsonwebtoken.verify(tokenJwt, JWT_SECRET);
        return token;
    } catch (error) {
        return null;
    }
}

module.exports = { tokenSign, verifyToken };