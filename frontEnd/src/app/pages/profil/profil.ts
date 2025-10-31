import { IgetUser } from './../../models/user';
import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profil',
  imports: [FormsModule, FontAwesomeModule, ButtonModule, RouterLink],
  templateUrl: './profil.html',
  styleUrl: './profil.scss'
})
export class Profil implements OnInit {
  constructor(private auth: AuthService) { }
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  ngOnInit(): void {
    this.me()
  }
  baseApi = environment.baseApi + '/static/'
  user: IgetUser = {
    name: 'John doe',
    email: '@example.com',
    roles: 'Frontend Developer',
  };
  isEditing: boolean = false
  faPen = faPen
  preview:string | null = null
  async me() {
    const res = await this.auth.getMe()
    this.user = res
    console.log('my user', this.user);
  }

  editUser() {
    this.isEditing = true
  }

  async saveChanges() {
    const userId = this.user._id ?? ''
    console.log(this.user);
    const res = await this.auth.editMe(userId, this.user)
    this.isEditing = false
  }

  AvatarClick() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      console.warn('⚠️ fileInput hali tayyor emas!');
    }
  }

  selectedFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]

    if (!file) return
    this.user.avatar = file
    const reader = new FileReader()
    reader.onload = (e: any) => {
       this.preview = e.target.result;
    };
    reader.readAsDataURL(file)
  }
}
