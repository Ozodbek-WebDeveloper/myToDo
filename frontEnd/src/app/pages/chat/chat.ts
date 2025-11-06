import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, DatePipe } from '@angular/common'; // DatePipe qo'shildi!

// PrimeNG imports
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

import { SocketService } from '../../service/socket.service';
import { Subscription } from 'rxjs';

// Xabarni ifodalovchi interface (Backend Modelidan kelgan maydonlarni o'z ichiga olishi kerak)
interface Message {
  _id?: string;        // 💡 MongoDB IDsi
  senderId: string;
  receiverId: string
  text: string;
  createdAt?: Date;  // 💡 Backend tomonidan beriladi
}

@Component({
  selector: 'app-chat',
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    FloatLabelModule,
    NgClass,
    DatePipe // 👈 MUHIM: DatePipe endi mavjud!
  ],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
  standalone: true,
})
export class Chat implements OnInit, OnDestroy {
  currentUserId: string = '60c72b2f90a9d100155b46e3';
  testReceiverId: string = '60c72b2f90a9d100155b46f4';
  messageContent: string = '';
  messages: Message[] = [];
  messageSubscription: Subscription | undefined;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    // 💡 Real-time xabarlarga obuna bo'lish
    this.messageSubscription = this.socketService.getNewMessage().subscribe(
      (message: Message) => {
        console.log('FRONTEND TEST: Xabar komponentga yetib keldi:', message);
        // Massivni almashtirish orqali Change Detection'ni majburlaymiz (xabarlar ko'rinishi uchun)
        this.messages = [...this.messages, message];
      }
    );
  }

  sendMessage(): void {
    if (this.messageContent.trim()) {
      const messageToSend: Message = {
        senderId: this.currentUserId,
        receiverId: this.testReceiverId,
        text: this.messageContent.trim()
      };

      // Xabarni yuborish
      this.socketService.sendMessage(messageToSend);

      this.messageContent = '';
    }
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
  }
}