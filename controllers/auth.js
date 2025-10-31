const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { userModel } = require("../models");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");

/**
 * Controlador encargado de registrar un nuevo usuario.
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl =  async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password };
        const dataUser = await userModel.create(body);
        dataUser.set('password', undefined, { strict: false });

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
};


/**
 * Controlador encargado de iniciar sesión de un usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await userModel.findOne({ email: req.email }).select("password name email role");

        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404);
            return;
        }

        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword);

        if (!check) {
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return;
        }

        user.set('password', undefined, { strict: false });
        const data = {
            token: await tokenSign(user),
            user: user
        }

        res.send({ data });
    }catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
};

module.exports = { registerCtrl, loginCtrl };