exports.sendToken = (user, token, statusCode, res) => {
    const options = {
      expires: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ),
      httpOnly: false,
    };
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.cookie("token", token, options);
    res.status(statusCode).json({
      success: true,
      user, 
      token,
      message: "Login Successful"
    })
  };
  