import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, DatePipe } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

import { SocketService } from '../../service/socket.service';
import { Subscription } from 'rxjs';
import { Auth } from '../../state/auth';
import { AuthService } from '../../service/auth.service';
import { IgetUser } from '../../models/user';
import { environment } from '../../../environments/environment';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from "@angular/router";
interface Message {
  _id?: string;
  senderId: string;
  text: string;
  createdAt?: string
}

@Component({
  selector: 'app-chat',
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    FloatLabelModule,
    NgClass,
    DatePipe,
    FaIconComponent,
    RouterLink
],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
  standalone: true,
})
export class Chat implements OnInit, OnDestroy {
  currentUserId: string | null = '';
  messageContent: string = '';
  messages: Message[] = [];
  messageSubscription: Subscription | undefined;
  currentUser: IgetUser | null = null
  users: IgetUser[] = []
  baseApi = environment.baseApi + '/static/'
  faHome = faHome
  constructor(private socketService: SocketService, private auth: Auth, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getMe()
    this.getAllUser()
    this.messageSubscription = this.socketService.getNewMessage().subscribe(
      (message: Message) => {
        console.log('FRONTEND TEST: Xabar komponentga yetib keldi:', message);
        this.messages = [...this.messages, message];
      }
    );

    this.auth.user$.subscribe(user => {
      this.currentUser = user
      this.currentUserId = user?._id ?? ''
    })

    this.getHistory()
  }

  getAvatar(id: string) {
    const user = this.users.find(u => u._id === id);
    // agar user mavjud bo‘lsa va avatar bo‘sh bo‘lmasa, this.baseApi + user.avatar, aks holda default
    return user && user.avatar ? this.baseApi + user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s';
  }


  sendMessage(): void {
    if (this.messageContent.trim()) {
      const messageToSend: Message = {
        senderId: this.currentUserId ?? '',
        text: this.messageContent.trim()
      };
      this.socketService.sendMessage(messageToSend);
      this.messageContent = '';
    }
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
  }

  async getHistory() {
    const res = await this.socketService.getHistory()
    this.messages = res
  }

  async getAllUser() {
    const res = await this.authService.getAllUser()
    this.users = res
  }
}