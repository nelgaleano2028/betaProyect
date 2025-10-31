const express = require('express');
const fs = require('fs');
const router = express.Router();

const PATH_ROUTES = `${__dirname}`

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const fileWithOutExt = removeExtension(file)
    const skip = ['index'].includes(fileWithOutExt)
    if (!skip) {
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`)) //TODO: localhost/users
        console.log('CARGAR RUTA ---->', fileWithOutExt)
    }
})

module.exports = router