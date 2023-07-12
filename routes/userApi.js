const express = require('express')
const router = express.Router()
const data = require('../data')
const showData = data.user;
const sweetsData = data.sweets;
const validation = require('../data/validation');


router.get('/', async(req,res)=>{
    try {
        const page = parseInt(req.query.page)
        if(page<0){
            res.status(400).json({error: "Page must be positive number"})
            return;
        }
        const sweetlist = await sweetsData.
    } catch (error) {
        
    }
})