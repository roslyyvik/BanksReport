const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var IndicatorsSchema = new Schema({
    indicator: String,
    mfo: Number,
    level: String,
    items: String,
    D2017_10_01: Number,
    D2018_01_01: Number,
    D2018_04_01: Number,
    D2018_07_01: Number,
    D2018_10_01: Number,
    D2019_01_01: Number,
    D2019_04_01: Number,
    D2019_07_01: Number,
    D2019_10_01: Number,
    D2020_01_01: Number,
    D2020_04_01: Number,
    D2020_07_01: Number,
    D2020_09_01: Number,
    D2020_10_01: Number,
    D2021_01_01: Number
})
const Indicators = mongoose.model('indicators', IndicatorsSchema)

module.exports = Indicators
