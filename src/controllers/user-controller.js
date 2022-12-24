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
                message:"Something went wrong while creating user",
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

const isAuthenticated = async (req,resp)=>{
    try {
        const token = req.headers["x-access-token"];
        const response = await userService.isAuthenticated(token);
        return resp.status(200).json({
            data:response,
            success:true,
            message:"user is authenticated and token is valid",
            err:{}
        })
    } catch (error) {
        return resp.status(501).json({
            data:{},
            success:false,
            message:"Something went wrong while authentication",
            err:{}
        });
    }
}

const isAdmin = async (req,resp)=>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return resp.status(200).json({
            data:response,
            err:{},
            success:true,
            message:"Role fetched successfully"
        });
    } catch (error) {
        return resp.status(200).json({
            data:{},
            err:error,
            success:true,
            message:"Something went wrong"
        })
    }
}

module.exports = {
     create,
     signIn,
     isAuthenticated,
     isAdmin
}