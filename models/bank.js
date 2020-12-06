const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const BankSchema = new Schema({
    KOD_EDRPOU: String,
    SHORTNAME: String,
    NKB: String,
    P_IND: String,
    NP: String,
    ADRESS: String,
    D_OPEN: String,
    MFO: Number,
    group:String,
    SVB:String,
    SPEC_OSCHAD:String,
    assetstotal: [Number],
    liabilities: [Number],
    capitaltotal: [Number],
    profittotal: [Number],
    indicators:[{ type: mongoose.Schema.Types.ObjectId, ref: 'indicators' }],
    normatives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'normatives' }]
})

BankSchema.plugin(mongoosePaginate)

const Bank = mongoose.model('banks', BankSchema)

module.exports = Bank
