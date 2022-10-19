var express = require('express');
const mongoDb = require('mongodb');
var url = "mongodb://localhost:27017/waytoprove";
var router = express.Router();

router.post('/cancelevent', function(req, res, next){
    console.log(req.body)
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('events')
        try{
            path.updateOne({_id : req.body._id},{$set : {eventStatus : 'Cancelled'}},function(err,result){
                console.log(result)
            })
        }catch{
            throw(err)
        }
    })
});

router.post('/update', function(req, res, next){
    console.log(req.body)
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('events')
        try{
            path.updateOne({_id : req.body._id},{$set : req.body.data},function(err,result){
                console.log(result)
            })
        }catch{
            throw(err)
        }
    })
});

// router.post('/update', function(req, res, next){
//     console.log(req.body)
//     const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
//     client.connect(err => {
//         console.log("Connected")
//         const path = client.db("waytoprove").collection('events')
//         try{
//             path.updateOne({_id : req.body._id},req.body.data,function(err,result){
//                 console.log(result)
//             })
//         }catch{
//             throw(err)
//         }
//     })
// });

router.post('/addresult', function(req, res, next){
    console.log(req.body)
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('events')
        try{
            path.updateOne({_id : req.body._id},{$set : {eventResults : req.body.result, 
                eventStatus : 'Completed'}},function(err,result){
                console.log(result)
            })
        }catch{
            throw(err)
        }
    })
});

module.exports = router;