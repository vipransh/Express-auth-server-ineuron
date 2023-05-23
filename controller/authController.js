import asyncHandler from 'express-async-handler'
import User from "../model/user.Schema.js"



const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
}

export const register=asyncHandler(async(req, res)=>{

    const {name, email, password}=req.body
 
          // check if all feilds exists
    if(!(name && email && password))
    {
        res.status(400);
        throw new Error("All feilds are required");
    }


    // check if user already exists
    const existingUser=await User.find({email});

    if(existingUser.name){
        res.status(400)
        throw new Error("User already exists");
    }
   

     const user=await User.create({
        name,
        email,
        password
    });

    if(user)
    {
        const token=user.generateJwtToken()
        user.password=undefined

        // send cookies to frontend

        res.cookie("token", token,cookieOptions);

        res.status(200).json({
            success: true,
            user,
            token
        })
    }
    else
    {
        res.status(400).json({
            success: false,
            message: "failed to create user"
        })
    }

})



export const signIn=asyncHandler(async(req,res)=>{
    // get email and password from req.body
    const {email, password}=req.body

    // check if email and password exists
    if(!(email && password))
    {
        res.status(400);

        throw new Error("Email and password are required");
    }

    const user=await User.findOne({email}).select('+password')

    if(!user){
        res.status(401)
        throw new Error("Email or password is invalid");
    }

    const isPasswordMatched=await user.comparePassword(password);

    if(isPasswordMatched)
    {
        const token=user.generateJwtToken();
        user.password=undefined
        res.cookie("token",token,cookieOptions)
        res.status(201).json({
            success: true,
            token,
            user
        })
    }
})
