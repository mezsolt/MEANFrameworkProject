var express = require('express');
var router = express.Router();
var pdf = require('pdfkit');
var fs = require('fs');
var path = require('path');
var d3 = require('d3'); // v3.5.17
var base64img = require('base64-img');
var node64image = require('node-base64-image');
var output = require('d3node-output');
var d3 = require('d3-node')().d3;
var d3nPie = require('../example/pie');

router.get('/probaemail',function(req,res){
    res.sendfile(path.resolve('./public/index.html'));
});

router.get('/probaform',function(req,res){
    res.sendfile(path.resolve('./public/index.html'));
});

router.get('/emailty',function(req,res){
    res.sendfile(path.resolve('./public/emailty.html'));
});


router.get('/probachart',function(req,res){
    res.sendfile(path.resolve('./public/probachart.html'));
});

router.get('/probatest',function(req,res){
    res.send('Hello World');
});

router.post('/probachart',function(req,res){
    var doc = new pdf();
    //var base64Image = req.body.split(';base64,').pop();

    //var image = base64img.img(req.body.data); 
    //var nodeimage = node64image.decode(req.body.data);

    var imgStr = req.body.image;

    console.log(req.body.image);
    var data = imgStr.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');

    doc.pipe(fs.createWriteStream('node.pdf'));
    //fs.writeFile('image.png', buf);
    console.log(buf);
    doc.image(buf,{scale: 0.25,
        align: 'center',
        valign: 'center'});

    doc.end();

});

router.get('/probanodechart',function(req,res){

    var csvString = fs.readFileSync('./example/data.csv').toString();
    const data = d3.csvParse(csvString);
// create output files
    output('./example/output', d3nPie({ data: data }));
    res.send('kesz');
});


module.exports = router;