import { ToastModule } from 'primeng/toast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NgClass, } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, ButtonModule, NgClass, ToastModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  providers: [MessageService]
})
export class Register implements OnInit {
  createUser!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.createUser = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async registerUser() {
    if (this.createUser.invalid) {
      this.createUser.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Formani toliq va togri toldiring.'
      });
      return;
    }

    this.isLoading = true;
    const { name, email, password } = this.createUser.value;

    try {
      const res = await this.auth.register({ name, email, password });
      if (res?.user) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully registered!'
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Something went wrong, please try again.'
        });
      }
    } catch (error) {
      console.error(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to register.'
      });
    } finally {
      this.isLoading = false;
    }
  }
}
