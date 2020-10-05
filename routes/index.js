const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ 'dest': 'uploads/' });
const {
    landingPage,
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getLogout,
    getProfile,
    updateProfile,
    getForgotPw,
    postForgotPw,
    getResetPw,
    postResetPw
} = require('../controllers');
const {
    asyncErrorHandler,
    isLoggedIn,
    isValidPassword,
    changePassword
} = require('../middleware')

/* GET home page. */
router.get('/', landingPage);
// GET register
router.get('/register', getRegister);

// POST /register
router.post('/register', upload.single('image'), asyncErrorHandler(postRegister));

// GET login
router.get('/login', getLogin);

// POST /login
router.post('/login', asyncErrorHandler(postLogin));

// GET /logout
router.get('/logout', getLogout)

// Get Profile
router.get('/profile', isLoggedIn, asyncErrorHandler(getProfile))

router.put("/profile",
    isLoggedIn,
    upload.single('image'),
    asyncErrorHandler(isValidPassword),
    asyncErrorHandler(changePassword),
    asyncErrorHandler(updateProfile)
)

router.get('/forgot-password', getForgotPw)

router.put('/forgot-password', asyncErrorHandler(postForgotPw))

// GET /reset/:token
router.get('/reset/:token', asyncErrorHandler(getResetPw))
    // PUT /reset/:token
router.put('/reset/:token', asyncErrorHandler(postResetPw))

module.exports = router;
