// import * as getCollectionFn from '../config/mongoCollection.js';
import * as validation from './validation.js';
import bcrypt from 'bcrypt';

import { ObjectId } from 'mongodb'
const saltRounds = 16;

// const {users} = getCollectionFn;
import { user } from "../config/mongoCollection.js";
const userCollection = await user();


export const createUser = async (name, username, password) => {
    username = validation.checkString(username, 'Username');
    name = validation.checkString(name, 'Name');

    const reWhiteSpace = /\s+/g;
    if (reWhiteSpace.test(username)) {
        throw 'Space not valid in username';
    }

    const hash = await bcrypt.hash(password, saltRounds);

    let newUserData = {
        name: name,
        username: username,
        password: hash
    };

    const userExist = await checkUserExist(username);

    if (userExist) {
        throw 'User already exists';
    }

    const inserInfo = await userCollection.insertOne(newUserData);
    if (!inserInfo.acknowledged || !inserInfo.insertedId) {
        throw 'Could not add user';
    }

    const newId = inserInfo.insertedId.toString();
    const data = await this.getId(newId);
    return data;
}

export const checkUser = async (username, password) => {
    username = validation.checkString(username, 'Username');

    const userExist = await checkUserExist(username);

    if (userExist) {
        const comparePass = await bcrypt.compare(password, userExist.password);
        if (!comparePass) {
            throw 'Password is wrong!!';
        }
        return { authenticated: true };
    } else {
        throw "User not exist"
    }
}

export const getUsername = async (username) => {
    username = validation.checkString(username, 'Username');

    const userCollection = await user();
    const userListData = await userCollection.find({}).toArray();
    const userNameLower = username.toLowerCase();

    const matchingUser = userListData.find(
        (shortData) => shortData.username.toLowerCase() === userNameLower
    );

    if (matchingUser) {
        matchingUser._id = matchingUser._id.toString();
        return matchingUser;
    } else {
        throw 'There are no usernames found';
    }
}

export const getAll = async () => {
    const userCollection = await users();
    const userListData = await userCollection.find({}).toArray();
    if (!userListData) {
        throw 'Could not get all users';
    }

    const Userslist = userListData.map((user) => {
        user._id = user._id.toString();
        return user;
    });

    return Userslist;
}

export const getId = async (userid) => {
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: ObjectId(userid) });
    if (user === null) {
        throw 'No user with that id';
    }

    user._id = user._id.toString();
    return user;
}

export const checkUserExist = async (username) => {
    const usernameLowerCase = username.toLowerCase();

    const usersCollection = await user();

    const userExists = await usersCollection.findOne({ username: usernameLowerCase });


    return userExists;
}


