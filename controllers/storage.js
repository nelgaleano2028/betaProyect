const fs = require('fs');
const { matchedData } = require('express-validator');
const { storageModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * OBTENER LISTADO DE REGISTROS
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
};


/**
 * OBTENER UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEM');
    }
};


/**
 * CREAR UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const { body, file } = req;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        };
        const data = await storageModel.create(fileData);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_ITEM');
    }
};


/**
 * ELIMINAR UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        await storageModel.delete({ _id: id });
        const filePath = `${MEDIA_PATH}/${data.filename}`;

        //fs.unlinkSync(filePath);
        const dataFile = {
            filePath,
            deleted: 1
        }

        res.send({ dataFile });
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_ITEM');
    }
};

module.exports = {
    getItems,
    getItem,
    createItem,
    deleteItem
};