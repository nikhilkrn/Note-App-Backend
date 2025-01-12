import { asyncHandler } from '../utils/asyncHandler.js'
import { apiResponse } from '../utils/apiResponse.js'
import { apiError } from '../utils/apiError.js'
import { User } from '../models/users.models.js'


const generateTokens = async (userid) => {
    try {
        const user = await User.findById(userid)
        const refreshtoken = user.GenerateAccessToken()
        user.GenerateRefreshToken = refreshtoken

        await user.save({ validateBeforeSave: false })
        return { refreshtoken }
    } catch (error) {
        throw new apiError(500, "Something went wrong")
    }
}


const AddUsers = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    const notuniqueUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (notuniqueUser) {
        res.status(403).json(
            new apiError(403, "User Already Exists")
        )
    }
    const user = await User.create({
        username: username,
        password: password,
        email: email,
    })
    const UserdCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!UserdCreated) {
        throw new apiError(500, "Something went wrong with server")
    }

    return res.status(201).json(
        new apiResponse(200, "User Created successfully", user)
    )
})


const SigninUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({
        username: username
    })
    if (!user) {
        res.status(403).json(
            new apiError(403, "user not found")
        )
    }

    const isValidPasword = await user.isPasswordCorrect(password)

    if (!isValidPasword) {
        res.status(403).json(
            new apiError(403, "Password is incorrect")
        )
    } else {
        const { refreshtoken } = await generateTokens(user._id)
        const loggedin = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .cookie("accessToken", refreshtoken, options)
            .json(
                new apiResponse(200,
                    {
                        user: loggedin, refreshtoken
                    },
                    "loggedin successfully"
                )
            )
    }
})


const SignOut = asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1
            }
        },{
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .json(
            new apiResponse(200,
                {
                    user: "User Logged Out"
                },
                "logged Out successfully"
            )
        )
})



export {
    AddUsers,
    SigninUser,
    SignOut,
}