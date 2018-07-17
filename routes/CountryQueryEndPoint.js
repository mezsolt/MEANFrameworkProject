var express = require('express');
var router = express.Router();
var DataSchema = require('./DataSchema');
var EmailHashSchema = require('./EmailHashSchema');
var mongoose = require('mongoose');
var md5 = require('md5');
var nodeMailer = require('nodemailer');
var fs = require('fs');

router.get('/country',function(req,res){

    var citiesByCountriesData2 = fs.readFileSync('../NodejsExpressCalculator/public/resources/citiesByCountriesJson');
    var citiesByCountriesDataRaw = JSON.parse(citiesByCountriesData2);

    var countries = [];

    var keys = Object.keys(citiesByCountriesDataRaw);
    for(var i =0 ;i < keys.length; i++) {
            countries[i] = keys[i];
    }
    res.send(countries);
});

router.post('/city',function(req,res){

    var citiesByCountriesData2 = fs.readFileSync('../NodejsExpressCalculator/public/resources/citiesByCountriesJson');
    var citiesByCountriesDataRaw = JSON.parse(citiesByCountriesData2);

    var cities = [];

    var keys = Object.keys(citiesByCountriesDataRaw);
    for(var i =0 ;i < keys.length; i++) {
        if(keys[i]==req.body.country) {
            cities = citiesByCountriesDataRaw[keys[i]];
        }
    }
    res.send(cities);
});


router.get('/form',function(req,res){
    res.sendfile('./public/form.html');
});


router.post('/email', function (req, res) {

    var pw = fs.readFileSync('../NodejsExpressCalculator/public/resources/pw');

    let transporter = nodeMailer.createTransport({
        host: 'smtp.iit.uni-miskolc.hu',
        port: 25,
        secure: false,
        auth: {
            user: 'meszaros8@iit.uni-miskolc.hu',
            pass: pw
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
    });

    EmailHashSchema.create({
        _id : new mongoose.Types.ObjectId(),
        emailHash : dataMD5,
    });

    res.cookie('emailAddress',req.body.email, { maxAge: 30000, httpOnly: true });
    next();
});

router.post('/data', function (req, res, next) {
    DataSchema.create({
        _id : new mongoose.Types.ObjectId(),
        sex : req.body.sex,
        age: req.body.age,
        country: req.body.country,
        city: req.body.city,
        salary: req.body.salary,
        date: Date.now()
    }, function (err,doc) {
        if(err){
            return console.log(err);
        }
        console.log(err);
        console.log(doc);
        res.status(415).send(err +' '+doc);
    });
});

router.get('/getdata', function (req, res) {
    DataSchema.find({}).exec(function(err, doc) {
        res.status(200).send(doc);
    });
});

router.get('/getemailhash', function (req, res) {
    EmailHashSchema.find({}).exec(function(err, doc) {
        res.status(200).send(doc);
    });
});

module.exports = router;