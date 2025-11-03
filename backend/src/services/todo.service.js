const todoModel = require("../models/todo.model");
const authEnum = require('../enums/auth.enum')
class todoService {
  async create(auther, data) {
    const res = await todoModel.create({ auther: auther, ...data });
    return res;
  }

  async paging(start, end, filter, role) {
    const res = await todoModel
      .find(filter)
      .sort({
        createdAt: -1,
      })
      .skip(start)
      .limit(end);
    const total = role === authEnum.USER_ROLES.ADMIN ?
      await todoModel.countDocuments() :
      await todoModel.countDocuments({ auther: filter.auther });

    return { total, res };
  }

  async findOne(id) {
    if (!id) {
      throw new Error("Id not found");
    }
    const res = await todoModel.findById(id);
    return res;
  }

  async put(id, body) {
    if (!id) {
      throw new Error("Id not found");
    }

    Object.keys(body).forEach((key) => {
      if (body[key] === "" || body[key] === null) {
        delete body[key];
        throw new Error("todo validation failed");
      }
    });
    const res = await todoModel.findByIdAndUpdate(id, body, { new: true });
    return res;
  }

  async delete(id) {
    return await todoModel.findByIdAndDelete(id);
  }
}

module.exports = new todoService();
