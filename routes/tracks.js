const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const { getItems, getItem, createItem, updateItem,deleteItem } = require('../controllers/tracks');

/**
 * Obtener todos los items
 */
router.get('/', authMiddleware, getItems);

/**
 * Obtener un item
 */
router.get('/:id', authMiddleware, validatorGetItem, getItem);

/**
 * Crear un item
 */
router.post('/', authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem);

/**
 * Actualizar un item
 */
router.put('/:id', authMiddleware, validatorGetItem, validatorCreateItem, updateItem);

// Eliminar un item
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);

module.exports = router