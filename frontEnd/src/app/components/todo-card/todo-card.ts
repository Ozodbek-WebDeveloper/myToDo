import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-todo-card',
  imports: [NgClass, JsonPipe, FontAwesomeModule, DatePipe],
  templateUrl: './todo-card.html',
  styleUrl: './todo-card.scss',
  standalone: true
})
export class TodoCard {
  @Input() todos: any = [];
  @Output() delete = new EventEmitter<string>()
  @Output() edit = new EventEmitter<string>()
  faDelete = faTrash
  faPen = faPen

  deleteTodo(id: string) {
    this.delete.emit(id)
  }

  editTodo(id: string) {
    this.edit.emit(id)
  }
}
