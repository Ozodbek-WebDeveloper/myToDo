import { Injectable, NgZone } from '@angular/core';
import axios from '../api/axios.config';
import { Subject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket!: Socket;
  private messageSubject = new Subject<any>();

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      // 💡 ENG MUHIM QADAM: Socket ulanishini o'rnatish
      this.socket = io('http://localhost:8000', {
        reconnection: true,
        transports: ['websocket', 'polling']
      });

      // Serverdan kelgan xabarni tinglash
      this.socket.on('message', (msg) => {

        console.log('SOCKET SERVICE TEST: Serverdan xabar qabul qilindi:', msg);

        this.ngZone.run(() => {
          this.messageSubject.next(msg);
        });
      });
    });
  }

  // 💡 sendMessage funksiyasini to'g'irladim (argument nomini 'message' ga)
  sendMessage(message: { senderId: string, text: string }): void {
    this.socket.emit('sendMessage', message);
  }

  getNewMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  async getHistory() {
    try {
      const res = await axios.get('/chat/history')
      return res.data
    } catch (error) {
      console.log(error);

    }
  }

}