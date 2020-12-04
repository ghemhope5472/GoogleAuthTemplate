const passport          = require('passport')
const GoogleStrategy    = require('passport-google-oauth20')
const keys              = require('./keys')
const User              = require('../models/user-model')


//cookie 
passport.serializeUser((user,done) =>{
    done(null, user.id)
})

passport.deserializeUser((id,done) =>{
    User.findById(id).then((user)=>{
        done(null, user)
    })   
})






passport.use(
  new GoogleStrategy(
    {
      //option for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      //google sends information of the person's account
      //check if user already exists in our db
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // if googleId is found
          console.log('User is ',  currentUser)
          // when a user is found, call the done method and pass in the user for serialization
          done(null, currentUser) 
        } else {
          //if googleId not found
          new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture
          })
            .save()
            .then((newUser) => {
              console.log("New use created: " + newUser);
              // when a user is created, call the done method and pass in the user for serialization
              done(null, newUser)
            });
        }
      });
    }
  )
)





