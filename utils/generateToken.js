import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    }); //Thats how you create a token (JWT_SECRET used as digital signature)

    res.cookie("jwt",token,{
        maxAge: 15 * 24 *60 * 60 * 1000, //millisec format
        httpOnly: true, //prevent XSS attacks cross site scripting attacks
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development"
    });
};

export default generateTokenAndSetCookie;