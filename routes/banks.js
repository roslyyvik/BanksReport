const express = require('express');
const router = express.Router();
const {
    searchAndFilterBanks
    // isLoggedIn
} = require('../middleware');
const {
    getIndex,
    bankShow1
} = require('../controllers/bank.js');

// GET banks /banks
router.get('/', searchAndFilterBanks, getIndex)

router.get('/:id', bankShow1)

module.exports = router
