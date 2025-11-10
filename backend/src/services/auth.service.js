const UserDto = require("../dtos/user.dto");
const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const mailService = require("./mail.service");
const fileService = require("./file.service");

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
      `${process.env.BASE_URL}/activated/${user.id}`
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
      throw new Error("Refresh token not provided");
    }

    const userPayload = await tokenService.validateRefreshToken(refreshToken);
    if (!userPayload) {
      throw new Error("Invalid refresh token");
    }

    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!tokenFromDb) {
      throw new Error("Refresh token not found in database");
    }

    const user = await authModel.findById(userPayload.id);
    if (!user) {
      throw new Error("User not found");
    }

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
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

  async getMe(id) {
    const user = await authModel.findById(id);
    return user;
  }

  async edit(id, user, file) {
    try {
      if (file) {
        const fileName = await fileService.save(file);
        user.avatar = fileName;
        console.log("Saved file:", fileName);
      }

      const res = await authModel.findByIdAndUpdate(
        id,
        { ...user },
        { new: true }
      );
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAll() {
    try {
      const res = await authModel.find()
      return res
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async delete(id) {
    try {
      const res = await authModel.findByIdAndDelete(id)
      return res
    } catch (error) {
      throw new Error(error.messages)
    }
  }

  async sendActiveLink(userID) {
    const user = await authModel.findById(userID)
    if (!user) {
      throw new Error('User not found');
    }
    const res = await mailService.sendMail(
      user.email,
      `${process.env.BASE_URL}/activated/${user._id}`
    )
    return res
  }
}

module.exports = new authService();
