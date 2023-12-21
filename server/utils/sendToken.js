 export const sendToken = (res, user, message, statusCode = 200) => {
    const token = user.getJWTToken();
    const options = {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),// this is to set the expiry date of the cookie
      httpOnly: true,// this is to prevent cross site scripting attacks
      // secure: true,//  this is to allow https only
      sameSite: "none",// this is to allow cross site cookies in production
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      message,
      user,
    });
  };
  