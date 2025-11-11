import { Injectable } from '@angular/core';
import { IgetUser, IUser } from '../models/user';
import axios from 'axios'
import { environment } from '../../environments/environment';
import axiosInstanse from '../api/axios.config'
import { Auth } from '../state/auth';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) { }
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
      this.auth.logout()
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async getMe() {
    try {
      const res = await axiosInstanse.get('/auth/me')
      this.auth.login(res.data)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async editMe(id: string, body: IgetUser) {
    try {
      const formData = new FormData()
      if (body.name) formData.append("name", body.name);
      if (body.email) formData.append("email", body.email);
      if (body.roles) formData.append("roles", body.roles);
      if (body.isActive !== undefined) formData.append("isActive", String(body.isActive));
      if (body.avatar instanceof File) {
        formData.append("avatar", body.avatar);
      } else if (typeof body.avatar === "string") {
        formData.append("avatar", body.avatar);
      }
      const res = await axiosInstanse.post(`/auth/edit/${id}`, formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      })
      return res.data
    } catch (error) {
      console.log(error);

    }
  }

  async getAllUser() {
    try {
      const res = await axiosInstanse.get('/auth/getUsers')
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: string) {
    try {
      const res = await axiosInstanse.delete(`/auth/user/${id}`)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async sendLinkEmail(id: string) {
    try {
      const res = await axios.post(`${environment.apiUrl}/auth/activeLink/${id}`)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  async activetedEmail(id: string) {
    try {
      const res = await axios.get(`${environment.apiUrl}/auth/activeted/${id}`)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }
}

