const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    //READING FROM REQUEST BODY
    const { mail, password } = req.body;
    //FINDING ENTERED MAIL IN DATABASE
    const user = await User.findOne({ mail: mail.toLowerCase() });
    //CHECKING PASSWORD
    if (user && (await bcrypt.compare(password, user.password))) {
      //SENDING TOKEN
      const token = jwt.sign(
        {
          userId: user._id,
          mail,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      //RETURNING APPROPRIATE RESULTS FOR USERS
      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
          _id: user._id,
        },
      });
    }
    return res.status(400).send("Invalid credentials. Please try again");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postLogin;
