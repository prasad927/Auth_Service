const { response } = require("express");
const express = require("express");
const UserService = require("../services/user-services");

const userService = new UserService();


const create = async (req,resp)=>{
        try {
            const response = await userService.create({
                email:req.body.email,
                password:req.body.password
            });
            return resp.status(201).json({
                data:response,
                success:true,
                message:"Successfully created a new user",
                err:{}
            });

        } catch (error) {
            return resp.status(501).json({
                data:{},
                success:false,
                message:"Something went wrong",
                err:{}
            });
        }
}

const signIn = async(req,resp)=>{
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return resp.status(201).json({
            success:true,
            data:response,
            err:{},
            message:"Successfully signed in"
        }); 
    } catch (error) {
        return resp.status(501).json({
            data:{},
            success:false,
            message:"Something went wrong while signIn",
            err:{}
        });
    }
}

module.exports = {
     create,
     signIn
}