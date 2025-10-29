import { Injectable } from '@angular/core';
import axios from '../api/axios.config'
import { Ipaging, Itodo } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  async getTodo(paging: Ipaging) {
    try {
      const res = await axios.post('/todo/paging', paging)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async createTodo(todo: Itodo) {
    try {
      const res = await axios.post('/todo', todo)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(id: string) {
    try {
      const res = await axios.delete(`/todo/${id}`)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async edit(id: string, todo: Itodo) {
    try {
      const res = await axios.put(`/todo/${id}`, todo)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const res = await axios.get(`/todo/${id}`)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }
}
