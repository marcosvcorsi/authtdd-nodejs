const { User } = require("../models");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ message: "User or password is invalid" });
    }

    return res.json({ user, token: user.generateToken() });
  }
}

module.exports = new SessionController();
