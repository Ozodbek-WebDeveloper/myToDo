import { Component } from '@angular/core';
import { IUser } from '../../models/user';
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  constructor(private auth: AuthService, private route: Router) { }
  createUser: IUser = {
    name: null,
    email: null,
    password: null
  }

  async registerUser() {
    const res = await this.auth.register(this.createUser)
    this.route.navigate(['/login'])
  }

}
