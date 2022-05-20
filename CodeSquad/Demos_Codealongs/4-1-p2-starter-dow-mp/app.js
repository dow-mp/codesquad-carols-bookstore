require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const routes = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// allows us to store user state
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
// initialize passport so node uses it
app.use(passport.initialize());
// connects passport with express-session to track users state
app.use(passport.session());

app.use(routes);



require('./config/connection');

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});


