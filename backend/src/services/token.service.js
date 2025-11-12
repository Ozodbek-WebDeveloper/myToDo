const jwt = require("jsonwebtoken");
const tokenMolde = require("../models/token.molde");

class tokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const existUser = await tokenMolde.findOne({ user: userId });

    if (existUser) {
      existUser.refreshToken = refreshToken;
      return existUser.save();
    }

    const token = await tokenMolde.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    return await tokenMolde.findOneAndDelete({refreshToken});
  }

  async findToken(refreshToken) {
    return await tokenMolde.findOne({ refreshToken });
  }

  async validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      return null
    }
  }
  async validateAccessToken(accsecTokens) {
    try {
      return jwt.verify(accsecTokens, process.env.ACCESS_TOKEN_KEY);
    } catch (error) {
      return null
    }
  }
}

module.exports = new tokenService();
