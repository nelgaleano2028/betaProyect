const express = require('express');
const { registerCtrl, loginCtrl } = require('../controllers/auth');
const router = express.Router();
const { validatorRegister, validatorLogin } = require('../validators/auth');


/**
 * CREA UN NUEVO USUARIO
 */
router.post("/register", validatorRegister, registerCtrl);


// INICIAR SESIÓN
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;