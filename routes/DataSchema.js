var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/salaryData', {autoIndex : true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('MongoDB is Open');
});


var Schema = mongoose.Schema;

var CountrySchema = new Schema({
    _id : Schema.ObjectId,
    sex : String,
    age: String,
    country: String,
    city: String,
    educationalAttainment: String,
    experience: String,
    occupation: String,
    role: String,
    salary: Number,
    date: Date
});

module.exports = db.model('salaryDatas',CountrySchema);