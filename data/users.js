const mongoCollections = require('../config/mongoCollection')
const sweets = mongoCollections.sweets;
const users = mongoCollections.users;
const {ObjectId} = require('mongodb')
const validation = require('./validation')
const bcrypt = require('bcrypt')
const saltRounds = 16;


let exportedMethonds ={

async createUser(name, username, password){

},
async checkUser(username, password){

},
async getUsername(username){

},
async getall(){

},
async getId(userid){

}
}

module.exports = exportedMethonds