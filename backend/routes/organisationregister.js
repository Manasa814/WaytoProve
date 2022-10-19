var express = require('express');
const mongoDb = require('mongodb');
var url = "mongodb://localhost:27017/waytoprove";
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("Hello")
});

router.post('/', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('organisation')
        try{
            path.insertOne(req.body)
            res.json({message : 'Object Inserted'})
            console.log('Object Inserted')
        }catch{
            throw(err)
        }
    })
});


module.exports = router;