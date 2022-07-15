const express = require('express')
const router = express.Router()
const Users = require('../model/users')

router.get('/ping',(req,res)=>{
    // Users.create({
    //     fullName:"thonglv",
    //     email:'thonglv@hunghau.vn'
    // }).then(usr => res.json(usr))
    Users.find().then(usr=>res.json(usr))
})

router.get('/new/:id',(req,res)=>{
    console.log(req.query)
    console.log(req.params)
    res.json({a:req.query,b:req.params})
    // Users.create({
    //     displayName:'AAAA',
    //     email:'123@xyz.abc'
    // }).then(usr => {
    //     res.json(usr)
    // })
})

router.post('/new',(req,res)=>{
    console.log(req.body)
})

module.exports = router