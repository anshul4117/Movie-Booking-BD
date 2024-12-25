const { ApiError } = require('../../utils/ApiError');
const { ApiResponse } = require('../../utils/ApiResponse');
const User = require('../../models/User');

const userRegister = async (req, res) => {

    const { name, email, password, phone, role } = req.body;
    console.log(req.body.email)

    if (["name", "email", "password"].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError("400", "All Fields are requied")
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new ApiError(500, "User Already Exist, please login",)
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        role
    });

    const userCreated = await User.findById(user._id).select("-password -phone");
    if (!userCreated) {
        throw new Error(404, "Error While user register");
    }

    return res.status(200).json(
        new ApiResponse(200, userCreated, "User Register Successfully")
    );

}


const userLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!(email || password)) {
        throw new ApiError(501, "email & password required")
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not register");
    };

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
        throw new ApiError(404, "Invalid Password");
    }

    const loggedInUser = await User.findById(user._id)
    const token = await user.generateToken();
    // console.log("token : ", token);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("token", token, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser, token
            },
                "User Login Successfully"
            )
        );
}

const getProfile = async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200)
        .json(
            new ApiResponse(200, user, "User Profile")
        );
}

module.exports = {
    userRegister,
    userLogin,
    getProfile
}