const bcrypt = require('bcryptjs');

// CONTRASEÑA SIN ENCRIPTAR passwordPlain
const encrypt = async (passwordPlain) => {
    const hash = await bcrypt.hash(passwordPlain, 10); //Encripta la contraseña
    return hash;
}

// COMPARAR CONTRASEÑA SIN ENCRIPTAR CON LA ENCRIPTADA
const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}

module.exports = { encrypt,compare };