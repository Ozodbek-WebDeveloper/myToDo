const UserDto = require("../dtos/user.dto");
const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");

class authService {
  async register(name, email, password) {
    const existEmail = await authModel.findOne({ email });
    if (existEmail) {
      throw new Error(`user with existing email ${email} already registered`);
    }

    const passHash = await bcrypt.hash(password, 10);
    const user = await authModel.create({ name, email, password: passHash });
    const userDto = new UserDto(user);
    return { userDto };
  }
}

module.exports = new authService();
