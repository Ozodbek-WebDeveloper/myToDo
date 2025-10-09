const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");

class authController {
  async register(req, res) {
    try {

      const { name, email, password } = req.body;
      const data = await authService.register(name, email, password);
      res.cookie("refreshToken", data.token.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.cookie("refreshToken", data.token.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json("logout saccess");
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async activeted(req, res) {
    try {
      const id = req.params.id;
      const data = await authService.activated(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
}

module.exports = new authController();
