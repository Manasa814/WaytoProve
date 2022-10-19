var express = require('express');
const mongoDb = require('mongodb');

var url = "mongodb://localhost:27017/waytoprove";
var router = express.Router();

router.post('/', function(req, res, next){
    var email = req.body.email
    const client = new mongoDb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        console.log("Connected")
        const userPath = client.db("waytoprove").collection('users')
        const organisationPath = client.db("waytoprove").collection('organisation')
        try{
            function updateIsRegistered(userResults,organisationResults){
                var isRegistered = {message : (userResults == 0) 
                                            && (organisationResults == 0)  ? false : true,
                                userCount : userResults, organisationCount : organisationResults}
                console.log('isRegistered' + isRegistered +userResults + organisationResults)
                res.json(isRegistered)
            }
            userPath.count({emailId : email}).then(function(value){
                organisationPath.count({emailId : email}).then(function(result){
                    updateIsRegistered(value,result)
            })
            })
           
        }catch{
            throw(err)
        }
    })
})

module.exports = router