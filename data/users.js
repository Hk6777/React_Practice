const mongoCollections = require('../config/mongoCollection')
const sweets = mongoCollections.sweets;
const users = mongoCollections.users;
const { ObjectId } = require('mongodb')
const validation = require('./validation')
const bcrypt = require('bcrypt')
const saltRounds = 16;


let exportedMethonds = {

    async createUser(name, username, password) {

        username = validation.checkString(username, 'Username')
        name = validation.checkString(name, 'Name')

        var reWhiteSpace = new RegExp(/\s+/g);
        if (reWhiteSpace.test(username))
            throw `Space not valid in username`
        // password = validation.chec
        const hash = await bcrypt.hash(password, saltRounds)


        let newUserData = {
            name: name,
            username: username,
            password: hash
        }

        await this.checkUserExist(username)

        const inserInfo = await usercollection.insertOne(newUserData)
        if (!inserInfo.acknoledged || !inserInfo.insertedId) throw 'Could not add user'

        const newId = inserInfo.insertedId.toString()
        const data = await this.getId(newId)
        return data

    },
    async checkUser(username, password) {
        username = validation.checkString(username, 'Username')

        const userExist = await this.checkUserExist(username)

        comparePass = await bcrypt.compare(password, userExist.password)
        if (!comparePass) throw 'password is worng!!'

        return { authenticated: true }

    },
    async getUsername(username) {
        username = validation.checkString(username, 'Username')

        const userCollection = await users()
        const userListData = await userCollection.find({}).toArray()
        const userNameLower = username.toLowerCase()

        const matchingUser = userListData.find(shortData => shortData.username.toLowerCase() === userNameLower);

        if (matchingUser) {
            matchingUser._id = matchingUser._id.toString();
            return matchingUser;
        } else {
            throw "There are no usernames found";
        }


    },
    async getall() {

    },
    async getId(userid) {

    },
    async checkUserExist(username) {
        const usernameLowerCase = username.toLowerCase();

        const usersCollection = await users();

        const userExists = await usersCollection.findOne({ username: usernameLowerCase });
        if (!userExists) throw "Either the username or password is invalid";

        return userExists

    }
}

module.exports = exportedMethonds