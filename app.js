const path = require('path')
const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
//Models

dotenv.config({ path: './config/config.env' })

const app = express()
const authRoute = require('./routes/auth')(app, passport)
//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require("./routes/index"));
const models = require("./models");

require('./config/passport/passport')(passport, models.ser);

//Sync Database
models.sequelize.sync().then(function () {

    console.log('Nice! Database looks fine')

}).catch(function (err) {

    console.log(err, "Something went wrong with the Database Update!")

});

const port = process.env.PORT || 3000;
app.listen(
    port,
    console.log(`Server running in ${process.env.NODE_ENV} on ${port}`)
)

