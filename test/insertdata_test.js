const IndicatorSchema = require('../models/indicator');

// Import the mongoose module 
const mongoose = require('mongoose');

// Set up default mongoose connnection 
const mongoDB = 'mongodb+srv://dbRosvik:66117754@academind-ec3oo.mongodb.net/bank-reports';

mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;

//  Get the default connection
const db = mongoose.connection;

//  Check connection
db.once('open', function() {
    console.log('connected to MongoDB');

    var postObj = [{
            indicator: 'Активи',
            brand: 'Альфа банк',
            mfo: 335553,
            dt: '2019-07-01',
            items: 'Активи всього',
            value: 16600000
        },
        {
            indicator: 'Зобовязання',
            brand: 'Альфа банк',
            mfo: 335553,
            dt: '2019-10-01',
            items: 'Зобовязання всього',
            value: 15600123
        },
        {
            indicator: 'Капитал',
            brand: 'Альфа банк',
            mfo: 335553,
            dt: '2020-01-01',
            items: 'Капитал всього',
            value: 131023
        },
        {
            indicator: 'Прибутки',
            brand: 'Альфа банк',
            mfo: 335553,
            dt: '2020-04-01',
            items: 'Прибуток всього',
            value: 11200
        }
    ];

    IndicatorSchema.insertMany(postObj, function(err, docs) {
        if (err) {
            console.log('Insert data error');
        } else {
            console.log('Data were successfully stored', docs.length);
        }
    });
});

//  Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error'));