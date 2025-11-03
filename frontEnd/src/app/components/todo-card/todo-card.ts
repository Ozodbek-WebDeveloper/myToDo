import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faTrash, faPen, faClock } from '@fortawesome/free-solid-svg-icons'
import { Auth } from '../../state/auth';
import { IgetUser } from '../../models/user';
@Component({
  selector: 'app-todo-card',
  imports: [NgClass, FontAwesomeModule, DatePipe],
  templateUrl: './todo-card.html',
  styleUrl: './todo-card.scss',
  standalone: true
})
export class TodoCard {
  @Input() todos: any = [];
  @Input() users: IgetUser[] = []
  @Output() delete = new EventEmitter<string>()
  @Output() edit = new EventEmitter<string>()
  faDelete = faTrash
  faPen = faPen
  faClock = faClock
  user: IgetUser | null = null

  constructor(private auth: Auth) {
    this.auth.user$.subscribe(user => {
      this.user = user
    })
  }
  deleteTodo(id: string) {
    this.delete.emit(id)
  }

  editTodo(id: string) {
    this.edit.emit(id)
  }

  getName(userId: string) {
    const auther = this.users.find(u => u._id === userId)
    return auther?.name
  }
}
