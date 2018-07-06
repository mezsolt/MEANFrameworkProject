var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/calculator', {autoIndex : true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('MongoDB is Open');
});


var Schema = mongoose.Schema;

var sumSchema = new Schema({
    _id : Schema.ObjectId,
    a : Number,
    b : Number,
    sum : Number
});

module.exports = db.model('sums',sumSchema);