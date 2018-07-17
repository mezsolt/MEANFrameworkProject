var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/emailHash', {autoIndex : true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('MongoDB is Open');
});


var Schema = mongoose.Schema;

var EmailHashSchema = new Schema({
    _id : Schema.ObjectId,
    emailHash : String,

});

module.exports = db.model('emailHashes',EmailHashSchema);