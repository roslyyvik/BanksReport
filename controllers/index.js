const mongoose = require('mongoose')
const Bank = require('../models/bank')
const Normative = require('../models/normative')
const Indicators = require('../models/indicators')
const User = require('../models/user');
const passport = require('passport');
const util = require('util');
const { cloudinary } = require('../cloudinary');
const { deleteProfileImage } = require('../middleware');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


module.exports = {
    // GET Home
    async landingPage(req, res, next) {
        let banks = await Bank.findOne({ NKB: "191" })
            // console.log(banks)
        let ratios = await Bank.findOne({ NKB: "191" }).populate({
                path: 'normatives'
            })
            // console.log(ratios)
        let assets0_0 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'assets', level: "0_0" },
        })
        let assets1_0 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'assets', level: "1_0" },
        })
        let assets1_1 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'assets', level: "1_1" },
        })
        let assets3_3 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'assets', level: "3_3" },
        })
        let assets4_4 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'assets', level: "4_4" },
        })
        let assets5_5 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'assets', level: "5_5" },
        })
        let assets6_6 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'assets', level: "6_6" },
        })
        let liabilities1_1 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'liabilities', level: "1_1" },
        })
        let liabilities0_0 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'liabilities', level: "0_0" },
        })
        let liabilities2_2 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'liabilities', level: "2_2" },
        })
        let capital0_0 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'capital', level: "0_0" },
        })
        let capital1_1 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'capital', level: "1_1" },
        })
        let profits0_0 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'profit', level: "0_0" },
        })
        let profits1_1 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'profit', level: "1_1" },
        })
        let profits2_2 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'profit', level: "2_2" },
        })
        let profits3_3 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'profit', level: "3_3" },
        })
        let profits4_4 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'profit', level: "4_4" },
        })
        let profits5_5 = await Bank.findOne({ NKB: "191" }).populate({
            path: 'indicators',
            match: { indicator: 'profit', level: "5_5" },
        })
        res.render('index', { title: "Приклад", banks, ratios, assets0_0, assets1_0, assets1_1, assets3_3, assets4_4, assets5_5, assets6_6, liabilities1_1, liabilities0_0, liabilities2_2, capital0_0, capital1_1, profits0_0, profits1_1, profits2_2, profits3_3, profits4_4, profits5_5 });
    },

    // GET register
    getRegister(req, res, next) {
        res.render('register', { title: 'Register', username: '', email: '' })
    },
    //  POST Register
    async postRegister(req, res, next) {
        try {
            if (req.file) {
                const { path, filename } = req.file;
                req.body.image = { path, filename };
            }
            const user = await User.register(new User(req.body), req.body.password);
            req.login(user, function(err) {
                if (err) return next(err);
                req.session.success = `Ласкаво просимо, ${user.username}!`;
                res.redirect('/');
            });
        } catch (err) {
            deleteProfileImage(req);
            const { username, email } = req.body;
            let error = err.message;
            if (error.includes('duplicate') && error.includes('index: email_1 dup key')) {
                error = 'Користувач із вказаною електронною адресою вже зареєстрований';
            }
            res.render('register', { title: 'Register', username, email, error });
        }
    },
    // GET login
    getLogin(req, res, next) {
        if (req.isAuthenticated()) return res.redirect('/');
        if (req.query.returnTo) req.session.redirectTo = req.headers.referer;
        res.render('login', { title: 'Login' })
    },
    //  POST Login
    async postLogin(req, res, next) {
        const { username, password } = req.body;
        const { user, error } = await User.authenticate()(username, password);
        if (!user && error) {
            // return next(error)
            req.session.error = 'Пароль або ім’я користувача неправильні'
            return res.redirect('/login')
        }
        req.login(user, function(err) {
            if (err)
                return next(err);
            req.session.success = `З поверненням ${username}!`
            const redirectUrl = req.session.redirectTo || '/';
            delete req.session.redirectTo;
            res.redirect(redirectUrl)
        })
    },
    // GET logout
    getLogout(req, res, next) {
        req.logout();
        req.session.success = 'Ви вийшли з системи!'
        res.redirect('/');
    },

    async getProfile(req, res, next) {
        res.render('profile')
    },
    async updateProfile(req, res, next) {
        const {
            username,
            email
        } = req.body
        const { user } = res.locals
        if (username) user.username = username
        if (email) user.email = email
        if (req.file) {
            if (user.image.filename)
                await cloudinary.uploader.destroy(user.image.filename)
            const { path, filename } = req.file;
            user.image = { path, filename }
        }
        console.log(user.image)
        await user.save()
        const login = util.promisify(req.login.bind(req))
        await login(user)
        req.session.success = "Профіль успішно оновлено!"
        res.redirect('/profile')
    },

    getForgotPw(req, res, next) {
        res.render('users/forgot')
    },
    async postForgotPw(req, res, next) {
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                User.findOne({ email: req.body.email }, function(err, user) {
                    if (!user) {
                        req.session.error = 'Жодного облікового запису з цією адресою електронної пошти не існує.'
                        return res.redirect('/forgot-password');
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function(err) {
                        done(err, token, user);
                    });
                });
            },
            function(token, user, done) {
                let smtpTransport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL || '', 
                        pass: process.env.PASSWORD || '' 
                    }
                });

                var mailOptions = {
                    to: user.email,
                    from: '@gmail.com',
                    subject: 'Зміна паролю',
                    text: 'Ви отримали це повідомлення, тому що ви (або хтось інший) здійснив запит на заміну паролю для свого облікового запису..\n\n' +
                        'Натисніть на наступне посилання або вставте це у свій браузер, щоб завершити процес:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'Якщо ви цього не вимагали, проігноруйте цей електронний лист, і ваш пароль залишиться незмінним.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    console.log('mail sent');
                    req.session.success = 'An e-mail has been sent to ' + user.email + ' with further instructions.';
                    done(err, 'done');
                });
            }
        ], function(err) {
            if (err) return next(err);
            res.redirect('/forgot-password');
        });
    },
    getResetPw(req, res, next) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                req.session.error = 'Токен зміни паролю недійсний або термін його дії минув.';
                return res.redirect('/forgot-password');
            }
            res.render('users/reset', { token: req.params.token });
        });
    },
    async postResetPw(req, res, next) {
        async.waterfall([
            function(done) {
                User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                    if (!user) {
                        req.session.error = 'Password reset token is invalid or has expired.';
                        return res.redirect('back');
                    }
                    if (req.body.password === req.body.confirm) {
                        user.setPassword(req.body.password, function(err) {
                            user.resetPasswordToken = undefined;
                            user.resetPasswordExpires = undefined;

                            user.save(function(err) {
                                req.logIn(user, function(err) {
                                    done(err, user);
                                });
                            });
                        })
                    } else {
                        req.flash("error", "Passwords do not match.");
                        return res.redirect('back');
                    }
                });
            },
            function(user, done) {
                let smtpTransport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL || '@gmail.com', // TODO: your gmail account
                        pass: process.env.PASSWORD || '' // TODO: your gmail password
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: '@mail.com',
                    subject: 'Ваш пароль входу було змінено.',
                    text: 'Hello,\n\n' +
                        'Це підтвердження того, що пароль для вашого облікового запису ' + user.email + ' щойно було змінено.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    req.session.success = 'Вітаю! Ваш пароль входу було змінено.';
                    done(err);
                });
            }
        ], function(err) {
            res.redirect('users/reset');
        });
    }
}
