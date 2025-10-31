const customHeader = (req, res, next) => {
    try{
        const apiKey = req.headers.api_key;
        if(apiKey === "nags-01"){
            next();
        }else{
            res.status(403);
            res.send({error: "Forbidden - Invalid API Key"});
        }
    }catch(err){
        res.status(403);
        res.send({error: "Error in custom header middleware"});
    }
}

module.exports = customHeader;