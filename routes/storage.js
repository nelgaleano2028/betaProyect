const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { validatorGetItem } = require('../validators/storage');
const { createItem, getItems, getItem, deleteItem } = require('../controllers/storage');

/**
 * OBTENER LISTADO DE REGISTROS
 */
router.get('/', getItems);

/**
 * OBTENER UN REGISTRO
 */
router.get('/:id', validatorGetItem, getItem);

/**
 * ELIMINAR UN REGISTRO
 */
router.delete('/:id', validatorGetItem, deleteItem);

/**
 * SUBIR UN ARCHIVO
 */
router.post('/', uploadMiddleware.single("myfile"),createItem);
 
module.exports = router;