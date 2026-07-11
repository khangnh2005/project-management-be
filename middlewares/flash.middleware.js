module.exports = function () {
    return function (req, res, next) {
        // Lấy flash messages từ session
        res.locals.messages = req.session.messages || {};
        delete req.session.messages;
        
        // Thêm phương thức flash vào req
        req.flash = function (type, message) {
            if (!req.session.messages) {
                req.session.messages = {};
            }
            req.session.messages[type] = message;
        };
        
        next();
    };
};
