const todoModel = require("../models/todo.model");

class todoService {
  async create(auther, data) {
    const res = await todoModel.create({ auther: auther, ...data });
    return res;
  }

  async paging(start, end, filter) {
    const res = await todoModel
      .find(filter)
      .sort({
        createdAt: -1,
      })
      .skip(start)
      .limit(end);
    const total = await todoModel.countDocuments({ auther: filter.auther });
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
    const res = await todoModel.findByIdAndUpdate(id, body, { new: true });
    return res;
  }

  async delete(id) {
    return await todoModel.findByIdAndDelete(id);
  }
}

module.exports = new todoService();
