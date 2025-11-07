import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from "primeng/toast";
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ToastModule, RouterLink, ButtonModule, ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [MessageService]
})

export class Login implements OnInit {
  constructor(private auth: AuthService, private route: Router, private messageService: MessageService, private fb: FormBuilder) { }
  loginUser!: FormGroup
  isLoading = false

  ngOnInit(): void {
    this.loginUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  async login() {
    if (this.loginUser.invalid) {
      this.loginUser.markAllAsTouched()
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Formani toliq va togri toldiring.'
      });
      return
    }
    const { email, password } = this.loginUser.value
    this.isLoading = true
    try {
      const res = await this.auth.login({ email, password })
      if (res?.user) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully  logged in',
        });
        setTimeout(() => {
          this.route.navigate(['/'])
        }, 1500)
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
    this.isLoading = false
    this.loginUser.reset();
  }


}
