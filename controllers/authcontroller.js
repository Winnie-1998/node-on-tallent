var exports = module.exports = {}

exports.signup = function (req, res) {

    res.render('signup',
        {
            layout: 'login'
        });

}
exports.signin = function (req, res) {

    res.render('signin',
    {
        layout: 'login'
    });


}
