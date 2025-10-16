const tokenService = require("../services/token.service");

class authMiddleware {
  async verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ massage: "Unauthorizad" });
      }
      const token = authHeader.split(" ")[1];
      const decode = await tokenService.validateAccessToken(token);
      if (!decode) {
        return res.status(401).json({ massage: "Unauthorizad" });
      }
      req.user = decode;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token invalid or expired" });
    }
  }
}

module.exports = new authMiddleware();
