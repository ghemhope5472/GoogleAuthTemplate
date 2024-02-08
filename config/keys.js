// add this file to .gitignore


module.exports = {
    google: {
        clientID: "process.env.GOOGLE_CLIENT_ID",
        clientSecret: "process.env.GOOGLE_SECRET"
    },
    mongodb: {
        mongoURI: process.env.MONGO_URI,
        
    },
    session: {
        cookieKey: "process.env.COOKIE_SECRET"
    }
};
