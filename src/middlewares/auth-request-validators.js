const validateUserAuth = (req,resp,next) =>{
    if(!req.body.email || !req.body.password){
        return resp.status(400).json({
            success:false,
            data:{},
            message:"Something went wrong",
            err:"Email or passord missing in the request"
        });
    }

    next();
}

module.exports = {
    validateUserAuth
}