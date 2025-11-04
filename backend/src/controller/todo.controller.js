const todoService = require("../services/todo.service");
const authEnum = require('../enums/auth.enum')
class todoController {
  async create(req, res) {
    try {
      const auther = req.user.id;
      const isActive = req.user.isActive
      if (!isActive) {
        return res.status(401).json({ message: 'User not activated' })
      }
      const data = req.body;
      const post = await todoService.create(auther, data);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async getAll(req, res) {
    try {
      const { page, size, priority, isCompleted } = req.body;
      const start = (page - 1) * size;
      const auther = req.user.id;
      const role = req.user.role

      const filter = {};
      if (isCompleted !== undefined) filter.isCompleted = isCompleted;
      if (priority) filter.priority = priority;
      if (role !== authEnum.USER_ROLES.ADMIN) {
        filter.auther = auther
      }
      const data = await todoService.paging(start, size, filter, role);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async findOne(req, res) {
    try {
      const id = req.params.id;
      const data = await todoService.findOne(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async put(req, res) {
    try {
      const { body, params } = req;
      const data = await todoService.put(params.id, body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const data = await todoService.delete(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
}

module.exports = new todoController();
