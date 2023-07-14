import express from "express";
import configRoutes from './routes/index.js'
import session from 'express-session'

const app = express()
app.use(express.json());

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));



app.use("/signup", (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        return res.redirect("/login");
    }
});

app.use("/logout", (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        return res.redirect("/login");
    }
});
app.use("/login", (req, res, next) => {
    if (req.session.user) {
        // console.log("redirecting to home");
        if (req.session.user.justRegistered) {
            next();
        } else if (req.session.user.authentication) {
            return res.redirect("/sweet");
        }
    } else if (!req.session.user) {
        next();
    }
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});

