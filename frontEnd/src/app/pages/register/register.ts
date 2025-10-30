import { Component } from '@angular/core';
import { IUser } from '../../models/user';
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  constructor(private auth: AuthService, private route: Router, private messageService: MessageService) { }
  createUser: IUser = {
    name: null,
    email: null,
    password: null
  }

  async registerUser() {
    try {
      const res = await this.auth.register(this.createUser)
      if (res?.user) {
        this.messageService.add({
          severity: 'seccess',
          summary: 'Seccess',
          detail: 'Succesfully registered'
        })
        this.route.navigate(['/login'])
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Something went wrong,please try ageing.'
        })
      }
    } catch (error) {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to register'
      })
    }
  }

}
