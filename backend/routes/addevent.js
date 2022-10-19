var express = require('express');
const mongoDb = require('mongodb');
var url = "mongodb://localhost:27017/waytoprove";
var router = express.Router();

router.post('/', function(req, res, next){
    console.log(req.body)
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const path = client.db("waytoprove").collection('events')
        try{
            path.count().then(value =>{
                path.insertOne({_id : value+1,
                    eventName : req.body.eventName,
                    eventDescription : req.body.eventDescription,
                    eventStartDate: req.body.eventStartDate,
                    eventLastDate: req.body.eventLastDate,
                    eventStartTime:req.body.eventStartTime,
                    eventEndTime: req.body.eventEndTime,
                    eventVenue:req.body.eventVenue,
                    //selectAge : req.body.selectAge,
                    //selectAgeRest : req.body.selectAgeRest,
                    eventCategory : req.body.eventCategory,
                    eventHost : req.body.eventHost,
                    eventStatus : 'Scheduled',
                    applicants : [],
                    eventResults: [],
                    //selectGender : req.body.selectGender  
                })
                    res.json({message : 'Object Inserted'})
                    console.log('Object Inserted')
            })
           
        }catch{
            throw(err)
        }
    })
});


module.exports = router;