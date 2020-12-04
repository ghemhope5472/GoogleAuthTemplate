const router    = require('express').Router()
const passport  = require('passport');

///auth login
router.get('/login', (req, res ) => { res.render('login', {user:req.user})})

//auth logout
router.get('/logout', (req, res ) => {
    //handle with passport
    req.logout();
    res.redirect('/')
})


/// auth with google when /google is called it will use middleware which is passport.authnticate and the 
// passportconfig will be called( passport-setup.js)
router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}))

//callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    
    res.redirect('/profile/')
})

// auth route sample -- localhost:3000/auth/google
module.exports = router;