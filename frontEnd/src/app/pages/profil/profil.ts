import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { IgetUser } from '../../models/user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profil',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './profil.html',
  styleUrl: './profil.scss'
})
export class Profil implements OnInit {

  constructor(private auth: AuthService) { }
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  ngOnInit(): void {
    this.me()
  }
  user: IgetUser = {
    name: 'John doe',
    email: '@example.com',
    roles: 'Frontend Developer',
  };
  isEditing: boolean = false
  faPen = faPen

  async me() {
    const res = await this.auth.getMe()
    this.user = res
    console.log('my user', this.user);
  }

  editUser() {
    this.isEditing = true
  }

  saveChanges() {
    this.isEditing = false
    console.log('Profile saved');
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

    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.user.avatar = e.target.result
    }

    reader.readAsDataURL(file)
  }
}
