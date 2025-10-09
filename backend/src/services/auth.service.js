const UserDto = require("../dtos/user.dto");
const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const mailService = require("./mail.service");

class authService {
  async register(name, email, password) {
    const existEmail = await authModel.findOne({ email });
    if (existEmail) {
      throw new Error(`user with existing email ${email} already registered`);
    }

    const passHash = await bcrypt.hash(password, 10);
    const user = await authModel.create({ name, email, password: passHash });
    const userDto = new UserDto(user);
    await mailService.sendMail(
      email,
      `${process.env.BASE_URL}/api/auth/activeted/${user.id}`
    );
    const token = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, token.refreshToken);
    return { user: userDto, token };
  }

  async login(email, password) {
    const user = await authModel.findOne({ email });
    if (!user) {
      throw new Error("email not found");
    }

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      throw new Error("Password  is incorrect");
    }

    const userDto = new UserDto(user);
    const token = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, token.refreshToken);
    return { user: userDto, token };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("token not  found");
    }

    const userPayload = await tokenService.validateRefreshToken(refreshToken);
    const tokendb = await tokenService.findToken(refreshToken);
    if (!userPayload || !tokendb) {
      throw new Error("token incorrect");
    }

    const findUser = await authModel.findById(userPayload.id);
    const userDto = new UserDto(findUser);

    const token = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, token.refreshToken);

    return { user: userDto, token };
  }

  async activated(id) {
    const user = await authModel.findById(id);
    if (!user) {
      throw new Error("user not found");
    }

    user.isActive = true;
    user.save();
    const userDto = new UserDto(user);

    return { ...userDto };
  }
}

module.exports = new authService();
