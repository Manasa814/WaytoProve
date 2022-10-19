var express = require('express');
const mongoDb = require('mongodb');

var url = "mongodb://localhost:27017/waytoprove";
var router = express.Router();

router.post('/', function(req, res, next){
    var collection = req.body.type
    console.log(req.body)
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        const path = client.db("waytoprove").collection(collection)
        try{
            path.findOne(req.body.formData).then(value => {
                if(value == null)
                    res.json({authentication : false})
                else
                    res.json({authentication : true, name : value.firstName + ' ' + value.lastName})
            })
        }catch{
            throw(err)
        }
    })
});
module.exports = router