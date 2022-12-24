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
            return resp.status(201).json({
                data:{},
                success:false,
                message:"Something went wrong",
                err:{}
            });
        }
}


module.exports = {
     create
}