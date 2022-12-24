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
            console.log("Something went wrong in token creation",error);
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
}

module.exports = UserService;