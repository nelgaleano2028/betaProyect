const { matchedData } = require('express-validator');
const { tracksModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

/*     OBTENER LISTADO DE REGISTROS     */
const getItems = async (req, res) => {

    try {
        const user = req.user;
        const data = await tracksModel.find({});
        res.send({ data, user });
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
};


/*     OBTENER UN REGISTRO      */
const getItem = async (req, res) => { 
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.findById(id);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEM');
    }       
};


/*     CREAR UN REGISTRO        */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req); //matchedData obtiene los datos validados y saneados
        const data = await tracksModel.create(body);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_ITEM');
    }
};


/*     ACTUALIZAR UN REGISTRO       */
const updateItem = async (req, res) => { 
    console.log(req.body);
    try {
        const { id, body } = matchedData(req); //matchedData obtiene los datos validados y saneados
        const data = await tracksModel.findByIdAndUpdate(
            id,
            body
        );
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }    
};


/*     ELIMINAR UN REGISTRO         */
const deleteItem = async(req, res) => { 
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.delete({_id:id});
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_ITEM');
    }       
};


module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
};