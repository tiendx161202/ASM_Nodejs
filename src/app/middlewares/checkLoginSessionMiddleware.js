function checkLogin(req ,res ,next){
    if(!req.session.User){
        return res.redirect('/login');
    }
    next();
}

module.exports = checkLogin;