var express = require('express');
const mongoDb = require('mongodb');
var url = "mongodb://localhost:27017/waytoprove";
var router = express.Router();

router.get('/', function(req, res, next) {

});
router.post('/', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    var events = []
    console.log('Connected to fetch usereventdetails')
    client.connect(err => {

        const path = client.db("waytoprove").collection('users')
        const path1 = client.db("waytoprove").collection('events')
        try{
            path1.find({eventHost : })
        }catch{
            throw err
        }

    })
})

module.exports = router;