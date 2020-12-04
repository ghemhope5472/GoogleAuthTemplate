const express       = require('express')
const authRoutes    = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')
const mongoose      = require('mongoose')
const keys          = require('./config/keys')
const cookieSession = require('cookie-session')
const passport      = require('passport')

const app           = express()



//set up view engine
app.set('view engine', 'ejs')

//encrypt cookie
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}))



//initalize passport
app.use(passport.initialize())
app.use(passport.session())


// mongodb connection
mongoose.connect(
  keys.mongodb.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

//set up routes
app.use('/auth',authRoutes);     // concatenate to authRoutes  (/auth/login)
app.use('/profile',profileRoutes); 





// create home route
app.get('/', (req, res) => { res.render('home', {user: req.user})})

//port
app.listen(3000, ()=> console.log('App now listening'))