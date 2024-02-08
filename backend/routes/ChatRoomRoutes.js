const express = require('express');
const UserModel = require("../models/User")
const routes = express.Router();
const GroupChatModel = require('../models/GroupChat')

//signup

routes.post("/signup", async(req, res) => {
    try{
        const newUser = new UserModel({
            ...req.body
        });
        console.log(newUser);
        await newUser.save();
        res.status(201).send(newUser);
    }catch(error){
        console.error('Error while saving user:', error);
        res.status(500).send(error);
    }
})

//login
routes.post("/login", async(req, res) => {
    try{
        const {username, password} = req.body;
        const userInfo = await UserModel.findOne({username: username});
        console.log(userInfo);
        if (userInfo.username != req.body.username || userInfo.password != req.body.password){
            res.status(400).send({
                status: false,
                message: "Invalid Username and password"
            })
        }else{
            res.status(200).send({
                status: true,
                username: `${userInfo.username}`,
                message: "User logged in successfully",
            });
        }
    }catch(error){
        res.status(500).send(error);
    }
})

//join chat room
routes.get("/join", async(req, res) => {
    try{
        res.status(201).send("redirect to join page");
    }catch(error){
        console.error('Error while saving user:', error);
        res.status(500).send(error);
    }
})

routes.post(`/chat/:room`, async(req, res) => {
    try{
        const{username, room} = req.query

        const newGroupChat = new GroupChatModel({
            from_user: username,
            room: room,
            message: req.body.message,
        })
        await newGroupChat.save()
        res.status(201).send(newGroupChat);
    }catch(error){
        console.error('Error while saving user:', error);
        res.status(500).send(error);
    }
})



module.exports = routes;