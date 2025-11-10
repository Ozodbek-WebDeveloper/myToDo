import { Component, Output, EventEmitter, Input, OnInit, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { IgetUser, Itodo } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../state/auth';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-dialog',
  imports: [FontAwesomeModule, FormsModule, ButtonModule, NgClass],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  standalone: true
})

export class Dialog implements OnInit {
  @Output() addTodo = new EventEmitter<Itodo>()
  @Output() closeDialog = new EventEmitter<boolean>()
  @Output() editTodo = new EventEmitter<Itodo>()
  @Output() sendLink = new EventEmitter()
  @Input() editDate: any = {}
  @Input() isEditing!: boolean 
  @Input() isLoadingMail!: boolean
  faClose = faClose

  createTodo: Itodo = {
    title: null,
    description: null,
    priority: ''
  };
  users!: IgetUser | null
  ngOnInit(): void {
  }

  constructor(private auth: Auth) {
    this.auth.user$.subscribe(user => {
      this.users = user
    })
  }

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

  sendEmail() {
    this.sendLink.emit()
  }

  maskEmail(email: string): string {
    const [name, domain] = email.split('@');
    if (name.length <= 2) {
      return name[0] + '***@' + domain;
    }
    return name[0] + '***' + name[name.length - 1] + '@' + domain;
  }

}
