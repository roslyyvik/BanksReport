const mongoose = require('mongoose')
const Bank = require('../models/bank')
const Normative = require('../models/normative')
const Indicators = require('../models/indicators')

module.exports = {

    async getIndex(req, res, next) {
      const { dbQuery } = res.locals
      delete res.locals.dbQuery
      let banks = await Bank.paginate(dbQuery, {
      page: req.query.page || 1,
      limit:10,
      sort: {profittotal:-1}
    }
  )
      banks.page = Number(banks.page)
      if(!banks.docs.length && res.locals.query){
        res.locals.error = 'Жодного результату не знайдено!'
      }
      // const indicates = await Bank.find({"assetstotal.0":{$gt:0}})
        console.log()
        res.render('banksIndex', { title: "Перелік банків України", banks })
    },

    //www.tutorialspoint.com/perform-lookup-to-array-of-object-id-s-in-mongodb
    //github.com/Automattic/mongoose/issues/1399#issue-12382268

    async bankShow1(req, res, next){
      // let banks = await Bank.findById(req.params.id)

      let banks = await Bank.findById(req.params.id)
      let ratios = await Bank.findById(req.params.id).populate({
        path:'normatives'
        // match: { normative:'H1'}
        // select:'D2020_07_01'
      })
      let assets0_0= await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'assets', level:"0_0" },
      })
      let assets1_0= await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'assets', level:"1_0" },
      })
      let assets1_1= await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'assets', level:"1_1" },
      })
      let assets3_3= await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'assets', level:"3_3" },
      })
      let assets4_4= await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'assets', level:"4_4" },
      })
      let assets5_5= await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'assets', level:"5_5" },
      })
      let assets6_6= await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'assets', level:"6_6" },
      })
      let liabilities1_1 = await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'liabilities', level:"1_1" },
      })
      let liabilities0_0 = await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'liabilities', level:"0_0" },
      })
      let liabilities2_2 = await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'liabilities', level:"2_2" },
      })
      let capital0_0 = await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'capital', level:"0_0" },
      })
      let capital1_1 = await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'capital', level:"1_1" },
      })
      let profits0_0 = await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'profit', level:"0_0" },
      })
      let profits1_1 = await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'profit', level:"1_1" },
      })
      let profits2_2 = await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'profit', level:"2_2" },
      })
      let profits3_3 = await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'profit', level:"3_3" },
      })
      let profits4_4 = await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'profit', level:"4_4" },
      })
      let profits5_5 = await Bank.findById(req.params.id).populate({
        path:'indicators',
        match: { indicator:'profit', level:"5_5" },
      })
    // console.log(ratios)
// console.log(standart.indicators[0].D2020_07_01)
      res.render('banksShow1', { title: "Перелік банків України", banks, assets0_0, assets1_0, assets1_1, assets3_3, assets4_4, assets5_5, assets6_6, liabilities1_1, liabilities0_0, liabilities2_2, capital0_0, capital1_1, profits0_0, profits1_1, profits2_2, profits3_3, profits4_4, profits5_5, ratios })
    },

    async bankShow(req, res, next) {

        let banks = await Bank.findById(req.params.id)

        let ratios = await Bank.findById(req.params.id).populate({
          path:'normatives'
          // match: { indicator:'nomative'},
          // select:'D2020_07_01'
        })

        let assets0_0 = await Bank.findById(req.params.id).populate({
            path: 'assets',
            match: { level: "0_0" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let assets1_0 = await Bank.findById(req.params.id).populate({
            path: 'assets',
            match: { level: "1_0" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let assets1_1 = await Bank.findById(req.params.id).populate({
            path: 'assets',
            match: { level: "1_1" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let assets3_3 = await Bank.findById(req.params.id).populate({
            path: 'assets',
            match: { level: "3_3" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let assets4_4 = await Bank.findById(req.params.id).populate({
            path: 'assets',
            match: { level: "4_4" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let assets5_5 = await Bank.findById(req.params.id).populate({
            path: 'assets',
            match: { level: "5_5" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let assets6_6 = await Bank.findById(req.params.id).populate({
            path: 'assets',
            match: { level: "6_6" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let liabilities0_0 = await Bank.findById(req.params.id).populate({
            path: 'liabilities',
            match: { level: "0_0" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let liabilities1_1 = await Bank.findById(req.params.id).populate({
            path: 'liabilities',
            match: { level: "1_1" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let liabilities2_2 = await Bank.findById(req.params.id).populate({
            path: 'liabilities',
            match: { level: "2_2" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let profit0_0 = await Bank.findById(req.params.id).populate({
            path: 'profit',
            match: { level: "0_0" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let profit1_1 = await Bank.findById(req.params.id).populate({
            path: 'profit',
            match: { level: "1_1" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let profit2_2 = await Bank.findById(req.params.id).populate({
            path: 'profit',
            match: { level: "2_2" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let profit3_3 = await Bank.findById(req.params.id).populate({
            path: 'profit',
            match: { level: "3_3" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let profit4_4 = await Bank.findById(req.params.id).populate({
            path: 'profit',
            match: { level: "4_4" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let profit5_5 = await Bank.findById(req.params.id).populate({
            path: 'profit',
            match: { level: "5_5" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let capital0_0 = await Bank.findById(req.params.id).populate({
            path: 'capital',
            match: { level: "0_0" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        let capital1_1 = await Bank.findById(req.params.id).populate({
            path: 'capital',
            match: { level: "1_1" },
            // select: "dt items value",
            options: { sort: { 'value': -1 } }
        })

        // console.log(ratios);

        res.render('banksShow', { title: "Перелік банків України", banks, assets0_0, assets1_0, assets1_1, assets3_3, assets4_4, assets5_5, assets6_6, liabilities2_2, liabilities1_1, liabilities0_0, profit0_0, profit1_1, profit2_2, profit3_3, profit4_4, profit5_5, capital0_0, capital1_1, ratios })
    }
}
