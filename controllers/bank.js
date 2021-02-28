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
        console.log()
        res.render('banksIndex', { title: "Перелік банків України", banks })
    },

    //www.tutorialspoint.com/perform-lookup-to-array-of-object-id-s-in-mongodb
    //github.com/Automattic/mongoose/issues/1399#issue-12382268

    async bankShow1(req, res, next){
      let banks = await Bank.findById(req.params.id)
      let ratios = await Bank.findById(req.params.id).populate({
        path:'normatives'
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
              let portfolio_quality_individual = await Bank.findById(req.params.id).populate({
            path: 'indicators',
            match: { items: "у тому числі кредити та заборгованість фізичних осіб" }
        })
        let reserves_portfolio_individual = await Bank.findById(req.params.id).populate({
            path: 'indicators',
            match: { items: "у тому числі резерви під знецінення кредитів та заборгованості фізичних осіб" }
        })
        let portfolio_quality_legal = await Bank.findById(req.params.id).populate({
            path: 'indicators',
            match: { items: "у тому числі кредити та заборгованість юридичних осіб" }
        })
        let reserves_portfolio_legal = await Bank.findById(req.params.id).populate({
            path: 'indicators',
            match: { items: "у тому числі резерви під знецінення кредитів та заборгованості юридичних осіб" }
        })
        let liabilities_portfolio_legal = await Bank.findById(req.params.id).populate({
            path: "indicators",
            match: { items: "Кошти суб'єктів господарювання та небанківських фінансових установ" }
        })
        let liabilities_portfolio_individual = await Bank.findById(req.params.id).populate({
            path: "indicators",
            match: { items: "Кошти фізичних осіб" }
        })
        let liabilities_portfolio_total = await Bank.findById(req.params.id).populate({
            path: "indicators",
            match: { items: "Усього зобов’язань" }
        })
        let share_capital = await Bank.findById(req.params.id).populate({
            path: "indicators",
            match: { items: "Статутний капітал" }
        })
        let capital_total = await Bank.findById(req.params.id).populate({
            path: "indicators",
            match: { items: "Усього власного капіталу" }
        })
        let assets_total = await Bank.findById(req.params.id).populate({
            path: "indicators",
            match: { items: "Загальні активи, усього" }
        })
        let profit_total = await Bank.findById(req.params.id).populate({
                path: "indicators",
                match: { items: "Прибуток/(збиток) до оподаткування" }
            })
    // console.log(ratios)
      res.render('banksShow1', { title: "Перелік банків України", banks, assets0_0, assets1_0, assets1_1, assets3_3, assets4_4, assets5_5, assets6_6, liabilities1_1, liabilities0_0, liabilities2_2, capital0_0, capital1_1, profits0_0, profits1_1, profits2_2, profits3_3, profits4_4, profits5_5, ratios, portfolio_quality_individual, reserves_portfolio_individual, portfolio_quality_legal, reserves_portfolio_legal, liabilities_portfolio_legal, liabilities_portfolio_individual, liabilities_portfolio_total, share_capital, capital_total, assets_total, profit_total })
    }
}
