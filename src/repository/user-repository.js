const {User} = require("../models/index");

class UserRepository {

        async create(userData){
            try {
                const user = await User.create(userData);
                return user;
            } catch (error) {
                console.log("Something went wrong on repository layer");
                throw error;
            }
        }

        async destroy(userId){
            try {
                await User.destroy({
                    where:{
                        id:userId
                    }
                });
                return true;
            } catch (error) {
                console.log("Something went wrong on repository layer");
                throw error;
            }
        }
}


module.exports = UserRepository;