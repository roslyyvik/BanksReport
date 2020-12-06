const User = require('../models/user')
const Bank = require('../models/bank')
const { cloudinary } = require('../cloudinary');

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const middleware = {
    asyncErrorHandler: (fn) =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next)
        },
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.session.error = 'Для цього потрібно увійти в систему!';
        req.session.redirectTo = req.originalUrl;
        res.redirect('/login');
    },
    isValidPassword: async(req, res, next) => {
        const { user } = await User.authenticate()(req.user.username, req.body.currentPassword)
        if (user) {
            res.locals.user = user
            next()
        } else {
            // middleware.deleteProfileImage(req);
            req.session.error = 'Неправильний поточний пароль'
            return res.redirect('/profile')
        }
    },
    changePassword: async(req, res, next) => {
        const {
            newPassword,
            passwordConfirmation
        } = req.body;

        if (newPassword && !passwordConfirmation) {
            // middleware.deleteProfileImage(req);
            req.session.error = 'Відсутнє підтвердження пароля!';
            return res.redirect('/profile');
        } else if (newPassword && passwordConfirmation) {
            const { user } = res.locals;
            if (newPassword === passwordConfirmation) {
                await user.setPassword(newPassword);
                next();
            } else {
                // middleware.deleteProfileImage(req);
                req.session.error = 'Нові паролі повинні збігатися!';
                return res.redirect('/profile');
            }
        } else {
            next();
        }
    },

    async searchAndFilterBanks(req, res, next) {
        const queryKeys = Object.keys(req.query);

        if (queryKeys.length) {

            const dbQueries = [];
            let { search } = req.query;
            // if(group){
            //    dbQueries.push({group:group})
            // }
            if (search) {
                search = new RegExp(escapeRegExp(search), 'gi');
                dbQueries.push({
                    $or: [
                        { SHORTNAME: search },
                        { NKB: search },
                        { group: search }
                        // { SVB: search }
                    ]
                })
            }

            res.locals.dbQuery = dbQueries.length ? { $and: dbQueries } : {};
        }
        res.locals.query = req.query;

        queryKeys.splice(queryKeys.indexOf('page'), 1);
        const delimiter = queryKeys.length ? '&' : '?';
        res.locals.paginateUrl = req.originalUrl.replace(/(\?|\&)page=\d+/g, '') + `${delimiter}page=`;

        next();
    },
    deleteProfileImage: async req => {
        if (req.file) await cloudinary.uploader.destroy(req.file.filename);
    }
}

module.exports = middleware;