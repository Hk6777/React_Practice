const express = require('express')
const router = express.Router()
const data = require('../data')
const showData = data.user;
const sweetsData = data.sweets;
const validation = require('../data/validation');


router.post('/login', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        const userInfo = await showData.checkUser(username, password)

        if (userInfo.authenticated) {
            const userThatPostedInfo = await showData.getUsername(username)
            const loggedUserData = {
                _id: userThatPostedInfo._id,
                name: userThatPostedInfo.name,
                username: userThatPostedInfo.username
            }
            req.session.cookie.name = 'AutheCookie'
            req.session.user = loggedUserData
            res.json(loggedUserData)
            return
        } else {
            res.status(400).json({ error: 'You enterd invalid Username or Password' })
        }

    } catch (e) {
        res.status(400).json({ error: e })
    }
});

router.post('/signup', async (req, res) => {
    try {
        const name = req.body['name']
        const username = req.body['username']
        const password = req.body['password']

        const createUserData = await showData.createUser(name, username, password)
        res.json(createUserData)

    } catch (e) {

        res.status(400).json({ error: e })

    }

});

router.get('/logout', (req, res) => {
    try {

        if (req.session.user) {
            res.clearCookie('AuthCookie')
            req.session.destroy();
            res.status(200).json({ Notification: 'Logout done sucessfully' })
            return
        } else {

            res.status(403).json({ Notification: 'Access Denied' })
            return
        }

    } catch (e) {
        res.status(400)
    }
})

