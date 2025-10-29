import { Component, Output, EventEmitter, Input, OnInit, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Itodo } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  standalone: true
})

export class Dialog implements OnInit {
  @Output() addTodo = new EventEmitter<Itodo>()
  @Output() closeDialog = new EventEmitter<boolean>()
  @Output() editTodo = new EventEmitter<Itodo>()
  @Input() editDate: any = {}
  @Input() isEditing: boolean = false

  ngOnInit(): void {
  }

  faClose = faClose

  createTodo: Itodo = {
    title: null,
    description: null,
    priority: ''
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editDate'] && this.editDate && Object.keys(this.editDate).length > 0) {
      this.createTodo = { ...this.editDate }
    }
  }


  emitTodo() {
    if (this.isEditing) {
      console.log('Editing todo:', this.createTodo);
      this.editTodo.emit(this.createTodo);
    } else {
      console.log('Creating new todo:', this.createTodo);
      this.addTodo.emit(this.createTodo);
    }
  }

  close() {
    this.closeDialog.emit()
  }
}
