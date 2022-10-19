var express = require('express');
const mongoDb = require('mongodb');
var url = "mongodb://localhost:27017/waytoprove";
var router = express.Router();

router.get('/', function(req, res, next) {

});

router.post('/userdata', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('users')
        try{
            path.findOne(req.body).then(profileData => {
                    res.json(profileData)
                })
        }catch{
            throw(err)
        }
    })
});

router.post('/organisationdata', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('organisation')
        try{
            if(req.body != {})
                path.findOne(req.body).then(profileData => {
                    res.json(profileData)
                })
        }catch{
            throw(err)
        }
    })
});

module.exports = router;