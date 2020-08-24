const express = require('express');

const route = express.Router()


route.get('/', (req, res) => {
    res.render('login', {
        layout: 'login'
    })

});
route.get('/dashboard', (req, res) => {
    res.render('dashboard')
});
// route.get('/signup', (req, res) => {
//     res.render('sign-up')
// });

module.exports = route