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
            function updateToArray(profileData,result,i){
                if(result.length>0){
                    for(let k=0;k<profileData.interests.length;k++){
                        if(result[k] != null){
                            events.push(result[k])
                        }   
                    } 
                } 
                if(i == profileData.interests.length-1){
                    console.log(true)
                    res.json({eventsData : events,profileData : profileData})
                }
            }
            
            path.findOne(req.body).then(profileData => {//

                for(let i=0;i<profileData.interests.length;i++)
                    path1.find({eventCategory : profileData.interests[i]}).toArray(function(err,result){
                        updateToArray(profileData,result,i)
                    })
            })

        }catch{
            throw err
        }

    })
})

module.exports = router;