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
        
        const path = client.db("waytoprove").collection('events')
        try{
            path.find({applicants : {$all : [req.body.emailId]}}).toArray(function(err,result){
                console.log(result)
                res.json(result)
            })
        }catch{
            throw(err)
        }
    })
});

router.post('/organiserdata', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected",req.body.emailId)
        
        const path = client.db("waytoprove").collection('events')
        try{//"size.uom": "in"
            path.find({"eventHost.userEmail" : req.body.emailId}).toArray(function(err,result){
               console.log(result)
               res.json(result)
            })
        }catch{
            throw(err)
        }
    })
});

router.post('/savedEvents', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("47 , Connected",req.body.emailId)
        
        const path = client.db("waytoprove").collection('users')
        const path1 = client.db("waytoprove").collection('events')
        try{//"size.uom": "in"
            var savedEvents = []
            path.findOne({emailId : req.body.emailId}).then(profileData => {
                for(let i=0;i<profileData.savedEvents.length;i++)
                    path1.findOne({_id : profileData.savedEvents[i]}).then(result =>{
                        savedEvents.push(result)
                        if(i==profileData.savedEvents.length-1)
                            res.json(savedEvents)
                    })
                
            })
        }catch{
            throw(err)
        }
    })
});

router.post('/achievementsdata', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected",req.body.emailId)
        const path1 = client.db("waytoprove").collection('events')
        try{//"size.uom": "in"
            path1.find({eventResults :  req.body.emailId}).toArray(function(err,result){
                console.log(result)
                res.json(result)
            })
        }catch{
            throw(err)
        }
    })
});

module.exports = router;