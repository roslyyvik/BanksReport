const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NormativeSchema = new Schema({
    indicator: String,
    normative: String,
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
const Normative = mongoose.model('normatives', NormativeSchema)

module.exports = Normative
