import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IgetUser } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class Auth {
  private userSource = new BehaviorSubject<IgetUser | null>(null)

  user$ = this.userSource.asObservable()

  login(userData: IgetUser) {
    this.userSource.next(userData)
  }

  logout(){
    this.userSource.next(null)
  }
}
