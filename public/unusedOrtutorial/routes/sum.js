var express = require('express');
var router = express.Router();
var calculatorService = require('../../../services/calculatorService');
var sumSchema = require('./sumSchema');
var mongoose = require('mongoose');

/*router.post('/add', function(req, res) {
    var sum = calculatorService.add(parseInt(req.body.x),parseInt(req.body.y));
    res.redirect('/sum/' + sum);
});

router.post('/addp', function(req, res) {
    var sum = calculatorService.add(parseInt(req.query.x),parseInt(req.query.y));
    res.redirect('/sum/' + sum);
});

router.post('/sub', function(req, res) {
    var sum = calculatorService.sub(parseInt(req.body.y),parseInt(req.body.x));
    res.redirect('/sum/' + sum);
});
*/

router.get('/sum',function(req,res)
{
    console.log(req.query['a']);
    console.log(req.query['b']);
    //res.sendStatus(200).send(req.query['a']+req.query['b']);
    res.send({sum:calculatorService.add(parseInt(req.query.a),parseInt(req.query.b))});
    //res.render('form.html',{sum: req.params.sum});
    //res.sendfile('./public/form.html');
    //res.sendFile(path.join(__dirname, '../public', 'form.html'));
});

router.post('/sumschema',function(req,res){

    sumSchema.create({
        _id : new mongoose.Types.ObjectId(),
        a : req.body['a'],
        b : req.body['b'],
        sum : req.body['sum']
    }, function (err,doc) {
        if(err){
            return console.log(err);
        }
        console.log(err);
        console.log(doc);
        res.status(415).send(err +' '+doc);
    });
});

router.get('/sumschema',function(req,res){

    /*
    if(typeof req.query['plateNo'] != 'undefined'){
        Car.find({'plateNo' : req.query['plateNo']}).exec(function(err,doc){
            res.status(200).send(doc);
        });
        console.log('plateNo is %s',req.query['plateNo']);
        return;
    }*/
    sumSchema.find({}).exec(function(err, doc) {
        res.status(200).send(doc);
    });

});

router.put('/sumschema',function(req,res){

    sumSchema.find({'sum' : req.body['sum']}).exec(function(err,sums){
        if(err){
            console.log(err);
        }
        for(var i = 0; i < sums.length; i++){
            sums[i].a = req.body['a'];
            sums[i].b = req.body['b'];
            sums[i].sum = req.body['sum'];
            sums[i].save();
        }
        res.status(200).send(sums);
    });
});

router.delete('/sumschema',function(req,res){
    sumSchema.remove({'sum' : req.query['sum']}, function(err){console.log(err);});
    res.status(200).send(req.query['sum']+' has been removed!');
});

module.exports = router;
