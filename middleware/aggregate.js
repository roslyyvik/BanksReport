const Bank = require('../models/bank')
const Assets = require('../models/assets')

const middleware = {
    async bankAggregate(req, res, next) {
        const look = [{
            '$lookup': {
                'from': 'assets',
                'localField': '_id',
                'foreignField': 'bank',
                'as': 'assets'
            }
        }, {
            '$project': {
                '_id': 0,
                'brand': 1,
                'assets': 1
            }
        }];
        await Bank.aggregate(look)
    }
}
module.exports = middleware