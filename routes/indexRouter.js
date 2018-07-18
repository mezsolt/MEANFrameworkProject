var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/probaemail',function(req,res){
    res.sendfile(path.resolve('./public/index.html'));
});

router.get('/probaform',function(req,res){
    res.sendfile(path.resolve('./public/index.html'));
});
module.exports = router;