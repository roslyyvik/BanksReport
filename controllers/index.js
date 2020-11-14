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
                const { secure_url, public_id } = req.file;
                req.body.image = { secure_url, public_id };
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
        try {
            let user = await User.findById(req.params.id)
                // Delete image from cloudinary
            await cloudinary.uploader.destroy(user.cloudinary_id)
                // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path)
            const data = {
                name: req.body.name || user.name,
                email: req.body.email || user.email,
                avatar: result.secure_url || user.avatar,
                cloudinary_id: result.public_id || user.cloudinary_id
            }
            user = await User.findByIdAndUpdate(req.params.id, data, { new: true })
                // res.json(result)
            await user.save()
            const login = util.promisify(req.login.bind(req))
            await login(user)
            req.session.success = "Профіль успішно оновлено!"
            res.redirect('/profile')
            console.log(result);
        } catch (err) {
            console.log(err);
        }
        // const {
        //     username,
        //     email
        // } = req.body
        // const { user } = res.locals
        // if (username) user.username = username
        // if (email) user.email = email
        // if (req.file) {
        //     if (user.image.public_id)
        //         await cloudinary.uploader.destroy(user.image.public_id)
        //     const { secure_url, public_id } = req.file;
        //     user.image = { secure_url, public_id }
        // }
        // console.log(user.image)
        // await user.save()
        // const login = util.promisify(req.login.bind(req))
        // await login(user)
        // req.session.success = "Профіль успішно оновлено!"
        // res.redirect('/profile')
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
                        user: process.env.EMAIL || 'vlasnifinansy@gmail.com', // TODO: your gmail account
                        pass: process.env.PASSWORD || '66117754' // TODO: your gmail password
                    }
                });
                //                 var email_smtp = nodemailer.createTransport({
                //   host: "smtp.gmail.com",
                //   auth: {
                //     type: "OAuth2",
                //     user: "youremail@gmail.com",
                //     clientId: "CLIENT_ID_HERE",
                //     clientSecret: "CLIENT_SECRET_HERE",
                //     refreshToken: "REFRESH_TOKEN_HERE"
                //   }
                // });
                var mailOptions = {
                    to: user.email,
                    from: 'vlasnifinansy@gmail.com',
                    subject: 'Node.js Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
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
                req.session.error = 'Password reset token is invalid or has expired.';
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
                        user: process.env.EMAIL || 'vlasnifinansy@gmail.com', // TODO: your gmail account
                        pass: process.env.PASSWORD || '66117754' // TODO: your gmail password
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'vlasnifinansy@mail.com',
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    req.session.success = 'Success! Your password has been changed.';
                    done(err);
                });
            }
        ], function(err) {
            res.redirect('users/reset');
        });
    }
}