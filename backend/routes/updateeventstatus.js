var express = require('express');
const mongoDb = require('mongodb');

var url = "mongodb://localhost:27017/waytoprove";
var router = express.Router();

router.post('/', function(req, res, next){
    console.log(req.body)
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        const path = client.db("waytoprove").collection('events')
        try{
            path.updateOne(req.body,{eventStatus : 'Cancelled'},function(err, result){
                console.log(result)
            })
        }catch{
            throw(err)
        }
    })
});
module.exports = router