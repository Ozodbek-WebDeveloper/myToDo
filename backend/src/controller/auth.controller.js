const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");

class authController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'name,email,password  required' });
      }
      const data = await authService.register(name, email, password);
      res.cookie("refreshToken", data.token.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
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
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
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
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async me(req, res) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      const decode = await tokenService.validateAccessToken(token);

      const data = await authService.getMe(decode.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async editMe(req, res) {
    try {
      const file = req.files?.avatar;
      const id = req.params.id;
      const body = req.body;
      const data = await authService.edit(id, body, file);
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async getAll(req, res) {
    try {
      const data = await authService.getAll()
      return res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
      console.log(error);
    }
  }

  async detele(req, res) {
    try {
      const id = req.params.id
      const data = await authService.delete(id)
      return res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
      console.log(error);

    }
  }

  async activeLink(req, res) {
    try {
      const id = req.params.id
      const data = await authService.sendActiveLink(id)
      return res.status(200).json({ message: 'please chek your email' })
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }
}

module.exports = new authController();
