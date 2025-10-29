import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import axios from 'axios'
import { environment } from '../../environments/environment';
import axiosInstanse from '../api/axios.config'
@Injectable({ providedIn: 'root' })
export class AuthService {
  async register(user: IUser) {
    try {
      const res = await axios.post(`${environment.apiUrl}/auth/register`, user)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async login(user: IUser) {
    try {
      const res = await axios.post(`${environment.apiUrl}/auth/login`, user, { withCredentials: true })
      const token: string = res.data.token.accessToken
      localStorage.setItem('accessToken', token)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      const res = await axios.post(`${environment.apiUrl}/auth/logout`, {}, { withCredentials: true })
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async getMe() {
    try {
      const res = await axiosInstanse.get('/auth/me')
      return res.data
    } catch (error) {
      console.log(error);
    }
  }
}
