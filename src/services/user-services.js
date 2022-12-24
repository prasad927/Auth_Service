const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRepository = require("../repository/user-repository");
const {JWT_KEY} = require("../config/serverConfig")

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer.");
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            const isPasswordMatch = this.checkPassword(plainPassword,user.password);
            if(!isPasswordMatch){
                console.log("Password does'nt match");
                throw {error:"Incorrect password"}
            }

            const newJwt = this.createToken({
                email:user.email,
                id:user.id
            });

            return newJwt;

        } catch (error) {
            console.log("Something went wrong in the signIn process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error:"Invalid token"}
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error:"No user with the corresponding token exists"};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the signIn process");
            throw error;
        }
    }

    createToken(user){
        try {
            console.log(JWT_KEY);
            const result = jwt.sign(user,JWT_KEY,{expiresIn:"1h"});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token varification",error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,storedEncryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,storedEncryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}

module.exports = UserService;