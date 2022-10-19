var express = require('express');
const mongoDb = require('mongodb');
var url = "mongodb://localhost:27017/waytoprove";
var router = express.Router();

router.post('/like', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('users')
        try{
            console.log(req.body.emailId,req.body.eventId)
            path.updateOne({emailId : req.body.emailId},
                {$push : {likedEvents : req.body.eventId}},
                function(err, res) {
                if (err) throw err;
                console.log(res.result.nModified + " document(s) updated")})
                path.find({likedEvents:{$all :[req.body.eventId]}}).count().then(value =>{
                    res.json({likeCount : value})
                })
        }catch{
            throw(err)
        }
    })
});

router.post('/getlikecount', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('users')
        try{
            path.find({likedEvents:{$all :[req.body.eventId]}}).count().then(value =>{
                res.json({likeCount : value})
            })
        }catch{
            throw(err)
        }
    })
});


router.post('/unlike', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('users')
        try{
            path.updateOne({emailId : req.body.emailId},
                {$pull : {likedEvents : req.body.eventId}},
                function(err, res) {
                if (err) throw err;
                console.log(res.result.nModified + " document(s) updated")})
                path.find({likedEvents:{$all :[req.body.eventId]}}).count().then(value =>{
                    res.json({likeCount : value})
                    console.log('41',value)
                })
        }catch{
            throw(err)
        }
    })
});

router.post('/save', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('users')
        try{
            console.log(req.body.emailId,req.body.eventId)
            path.updateOne({emailId : req.body.emailId},
                {$push : {savedEvents : req.body.eventId}},
                function(err, res) {
                    if (err) throw err;
                    path.findOne({emailId : req.body.emailId}).then(value => {
                        res.json({savedEvents : value.savedEvents})
                    })
                })
        }catch{
            throw(err)
        }
    })
});

router.post('/unsave', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('users')
        try{
            console.log(req.body.emailId,req.body.eventId)
            path.updateOne({emailId : req.body.emailId},
                {$pull : {savedEvents : req.body.eventId}},
                function(err, res) {
                if (err) throw err;
                console.log(res.result.nModified + " document(s) updated")})
                path.findOne({emailId : req.body.emailId}).then(value => {
                    res.json(value.savedEvents)
                })
               
        }catch{
            throw(err)
        }
    })
});

router.post('/apply', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('users')
        const path1 = client.db('waytoprove').collection('events')
        try{
            console.log('apply',req.body.emailId,req.body.eventId)
            path.updateOne({emailId : req.body.emailId},
                {$push : {appliedEvents : req.body.eventId}},
                function(err, res) {
                if (err) throw err;
                })
                path1.updateOne({_id : req.body.eventId},
                    {$push : {applicants : req.body.emailId}},function(err1, res1) {
                        if (err) throw err;
                        res.json({message:'Applied succesfully'})
                    })
        }catch{
            throw(err)
        }
    })
});


router.post('/share', function(req, res, next){
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db('waytoprove').collection('events')
        try{
            path.findOne({_id : req.body.eventId}).then(result => {
                console.log(result)
                res.json({htmlContent : '<html><head><title>waytoprove</title></head><body>'+
                '<h3>Event Details</h3><br/><br/>Event ID:' + result._id +
                '<br/>Event name: ' + result.eventName + '<br/>Event Description: ' + result.eventDescription +
                "<br/>For more information login to <a href='http://localhost:3001/'>waytoprove.com</a></body></html>"})
            })
        }catch{
            throw(err)
        }
    })
});


module.exports = router;