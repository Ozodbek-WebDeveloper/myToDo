const authService = require("../services/auth.service");

class authController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const data = await authService.register(name, email, password);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
}

module.exports = new authController();
