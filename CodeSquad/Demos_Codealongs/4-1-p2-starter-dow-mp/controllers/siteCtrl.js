// site controller handles all public requests/responses - often also handles all handlers that are global to the site
// note to self- redirect only accepts a path not a direct link to a specific file (path should come from the appropriate routes folder)

const User = require('../models/userModel');
const siteData = require('../data/siteData');
const passport = require('passport');

// no longer needed as we are instead using passport authentication which is more secure than salting/hashing passwords via bcrypt
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

module.exports = {
  index: (request, response) => {
    response.render('pages/index', {
        name: siteData.userName,
        copyrightYear: siteData.year,
        signedIn: siteData.signedIn
    });
  },
  register_get:(request, response) => {
    response.render('pages/register', {
      copyrightYear: siteData.year
    });
  },
  register_post:(request, response) => {
    // .register() gathers the information from the req.body and then stores the information a la .save() (so .register() completes hashing and salting and also saves the information - this function does MORE THAN ONE THING)
    const { username, password } = request.body;
    // within the parameters register() takes in, can either call them as variables or can call them directly by entering request.body.username and request.body.password
    User.register({username: username}, password, (error, user) => {
      if(error) {
        console.log(error);
        response.redirect('/register');
      } else {
        // unique syntax .authenticate takes in one param - the shortform of passport-local-mongoose
        // the other weird thing is that there is no separation via a comma or anything between calling authenticate method and the callback function!!!! this is SUPER WEIRD
        passport.authenticate('local')(request, response, () => {
          response.redirect('/admin')
        });
      }
    });

    // older less secure method of salting/hashing password on entry
    /* const { username, password } = request.body;
    bcrypt.has(password, saltRounds, (error, hash) => {
      const newUser = new User({
        username: username,
        password: hash
      });
      newUser.save();
      console.log('');
      response.redirect('/admin');
    }*/
  },
  login_get: (request, response) => {
    response.render('pages/login',{
      copyrightYear: siteData.year
    });
  },
  login_post: (request, response) => {
    const {username, password} = request.body;
    User.findOne({username: username}, (error, foundUser) => {
      if (error) {
        console.log(`The error at login is: ${error}`);
      } else {
        passport.authenticate('local')(request, response, () => {
          response.redirect('/admin')
        })
      };
    })
  },
    // older method of authenticating logging in user with bcrypt to match salted/hashed passwords, above is the newer authentication method of using passport
    /* const {username, password} = request.body;
    console.log(`password entered is: ${password}`);
    User.findOne({username: username}, (error, foundUser) => {
      if (error) {
        console.log(`The error at login is: ${error}`);
      } else {
        if(foundUser) {
          console.log(`username was matched: ${foundUser.username}`);
          console.log(`their password is: ${foundUser.password}`);
          // bcrypt.compare takes in three params: the password that was entered, the stored password (i.e. the hash value), and a callback fn that directs the computer what to do in the scenario that the results of the comparison of the two first params match and what to do if they do not
          bcrypt.compare(request.body.password, foundUser.password, (error, result) => {
            if (result){
              console.log(`user ${foundUser.username} logged in`);
              response.redirect('/admin');
            };
          })
        }
      };
    });*/
  logout: (request, response) => {
    request.logout();
    response.redirect('/login');
  }, 
  google_get: passport.authenticate('google', {scope: ['openid', 'profile', 'email']}),
  google_redirect_get: [
    passport.authenticate('google', { failureRedirect: '/login'}),
    function(req, res) {
      res.redirect('/admin');
    }
  ]
}