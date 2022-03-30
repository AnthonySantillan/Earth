const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash'); 
const mysqlstore = require('express-mysql-session');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');

 
const { database } = require('./keys'); 

const app = express(); 
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
/// archivos compartidos


//midlewars
app.use(fileUpload());
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());
app.use(session({
    secret: 'ARQUITECTOS',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//midlewars

//Global Variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});



//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));


//public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images/img-profile')));


// starting the server

app.listen(app.get('port'),() =>{
    console.log('server on port', app.get('port'));
});