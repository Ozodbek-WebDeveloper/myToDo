import { Component } from '@angular/core';
import { IUser } from '../../models/user';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from "primeng/toast";
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  imports: [FormsModule, Toast],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [MessageService]
})

export class Login {
  constructor(private auth: AuthService, private route: Router, private messageService: MessageService) { }
  loginUser: IUser = {
    email: null,
    password: null
  }

  async login() {
    try {
      const res = await this.auth.login(this.loginUser)
      if (res?.user) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully  logged in',
        });
        this.route.navigate(['/'])
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Something went wrong, please try again.',
        });
      }
    } catch (error) {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to login.',
      });
    }
  }
}
