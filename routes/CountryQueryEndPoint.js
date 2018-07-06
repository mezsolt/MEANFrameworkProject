var express = require('express');
var router = express.Router();
var CountrySchema = require('./CountrySchema');
var mongoose = require('mongoose');
var crypto = require('crypto');
var md5 = require('md5');
var nodeMailer = require('nodemailer');
var fs = require('fs');

//var citiesByCountries = require('../public/resources/citiesByCountriesJson');
//var citiesByCountries2 = require('../public/resources/citiesByCountries');

router.post('/country',function(req,res){

    var countries = [
        {name:"Albania"},
        {name:"Nigeria"}
    ];

    var data = req.query.md5;

    //crypto.createHash('md5').update(data).digest("hex");

    res.send(md5(data));

    //var citiesByCountriesData = fs.readFileSync(citiesByCountries);


    /*for(var i = 0; i < countries.length; i++){
        CountrySchema.create({
            _id : new mongoose.Types.ObjectId(),
            name : countries.name(i),
        }, function (err,doc) {
            if(err){
                return console.log(err);
            }
            console.log(err);
            console.log(doc);
            res.status(415).send(err +' '+doc);
        });
    }*/

});

router.get('/country',function(req,res){

    /*
    CountrySchema.find({}).exec(function(err, doc) {
        res.status(200).send(doc);
    });*/

    var citiesByCountriesData2 = fs.readFileSync('../NodejsExpressCalculator/public/resources/citiesByCountriesJson');
    var citiesByCountriesDataRaw = JSON.parse(citiesByCountriesData2);

    var countries = [];

    var keys = Object.keys(citiesByCountriesDataRaw);
    for(var i =0 ;i < keys.length; i++) {
        //if(keys[i]==req.query.country) {
            //res.send(citiesByCountriesDataRaw[keys[i]]);
            //res.send(keys[i]);
            countries[i] = keys[i];
            //console.log(citiesByCountriesDataRaw[keys[i]]);
            //console.log(keys[i]);
    }
    res.send(countries);
});

router.get('/proba',function(req,res){
    res.send({"asd":"feri"});
});



router.post('/city',function(req,res){

    /*
    CountrySchema.find({}).exec(function(err, doc) {
        res.status(200).send(doc);
    });*/

    var citiesByCountriesData2 = fs.readFileSync('../NodejsExpressCalculator/public/resources/citiesByCountriesJson');
    var citiesByCountriesDataRaw = JSON.parse(citiesByCountriesData2);

    var keys = Object.keys(citiesByCountriesDataRaw);
    for(var i =0 ;i < keys.length; i++) {
        //if(keys[i]==req.query.country) {
        if(keys[i]==req.body.country) {
            res.send(citiesByCountriesDataRaw[keys[i]]);
            //res.send([keys[i]]);
            //console.log(citiesByCountriesDataRaw[keys[i]]);
            //console.log(keys[i]);
        }
    }
    //res.send({"asd":"feri"});
});


router.get('/proba',function(req,res){
    res.send({"asd":"feri"});
});

router.put('/country',function(req,res){

    CountrySchema.find({'name' : req.body['name']}).exec(function(err,countries){
        if(err){
            console.log(err);
        }
        for(var i = 0; i < countries.length; i++){
            countries[i].name = req.body['name'];
            countries[i].save();
        }
        res.status(200).send(countries);
    });
});

router.delete('/country',function(req,res){
    CountrySchema.remove({'name' : req.query['name']}, function(err){console.log(err);});
    res.status(200).send(req.query['name']+' has been removed!');
});

router.post('/email', function (req, res) {

    /*let transporter = nodeMailer.createTransport({
        host: 'smtp.live.com',

        //service: 'gmail',
        port: 25,
        secure: false,
        auth: {
            user: 'nemhotzsolti@hotmail.com',
            pass: 'asdasd12'
        },
        tls: {
            chipers: "SSLv3"
        }
    });*/

    let transporter = nodeMailer.createTransport({
        host: 'smtp.iit.uni-miskolc.hu',
        port: 25,
        secure: false,
        auth: {
            user: 'meszaros8@iit.uni-miskolc.hu',
            pass: 's5mzgj'
        },
        tls: {
            chipers: "SSLv3"
        }
    });

    transporter.verify(function(error, success) {
       if(error ){
           console.log('kis cica');
       } else {
           console.log('server kesz');
       }
    });


    var data = req.body.email;
    var dataMD5 = md5(data);

    let mailOptions = {
        from: 'meszaros8@iit.uni-miskolc.hu', // sender address
        to: req.body.email, // list of receivers
        subject: 'nemzsolti vagyok', // Subject line
        text: 'nemzsolti vagyok a szomszedbol', // plain text body
        html: '<b>NodeJS Email Tutorial</b><br><a href="http://localhost:3000">'+dataMD5+'</a>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('asdError '+req.body.email);
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        //res.render('index');
    });
});

router.post('/data', function (req, res) {

    /*let transporter = nodeMailer.createTransport({
        host: 'smtp.live.com',

        //service: 'gmail',
        port: 25,
        secure: false,
        auth: {
            user: 'nemhotzsolti@hotmail.com',
            pass: 'asdasd12'
        },
        tls: {
            chipers: "SSLv3"
        }
    });*/

    let transporter = nodeMailer.createTransport({
        host: 'smtp.iit.uni-miskolc.hu',
        port: 25,
        secure: false,
        auth: {
            user: 'meszaros8@iit.uni-miskolc.hu',
            pass: 's5mzgj'
        },
        tls: {
            chipers: "SSLv3"
        }
    });

    transporter.verify(function(error, success) {
        if(error ){
            console.log('kis cica');
        } else {
            console.log('server kesz');
        }
    });


    var data = req.body.email;
    var dataMD5 = md5(data);

    let mailOptions = {
        from: 'meszaros8@iit.uni-miskolc.hu', // sender address
        to: req.body.email+' '+req.body.country+' '+req.body.city, // list of receivers
        subject: 'nemzsolti vagyok', // Subject line
        text: 'nemzsolti vagyok a szomszedbol', // plain text body
        html: '<b>NodeJS Email Tutorial</b><br><a href="http://localhost:3000">'+dataMD5+' '+req.body.country+' '+req.body.city+'</a>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('asdError '+req.body.email);
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        //res.render('index');
    });
});

module.exports = router;