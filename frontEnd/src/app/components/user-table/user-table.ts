import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IgetUser } from '../../models/user';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-user-table',
  templateUrl: 'user-table.html',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, SelectModule, ButtonModule, InputTextModule, FormsModule],
})
export class UserTable implements OnInit {
  @Input() users: IgetUser[] = []
  @Output() editUser = new EventEmitter<{ id: string, date: IgetUser }>()
  @Output() deleteUser = new EventEmitter()
  products!: IgetUser[];
  statuses!: SelectItem[];
  roles!: { label: string; value: string }[]
  clonedProducts: { [s: string]: IgetUser } = {};

  constructor(private messageService: MessageService, private auth: AuthService) { }

  ngOnInit() {
    this.products = this.users
    this.statuses = [
      { label: 'Inactive', value: false },
      { label: 'Active', value: true },
    ];
    this.roles = [
      { label: 'admin', value: 'admin' },
      { label: 'user', value: 'user' }
    ]
  }

  onRowEditInit(product: IgetUser) {
    this.clonedProducts[product._id as string] = { ...product };
  }

  onRowEditSave(product: IgetUser) {
    const { name, email, roles, isActive, _id } = product
    const newDate = { name, email, isActive, roles }
    delete this.clonedProducts[_id as string];
    this.editUser.emit({ id: _id ?? '', date: newDate })
  }

  onRowEditCancel(product: IgetUser, index: number) {
    this.products[index] = this.clonedProducts[product._id as string];
    delete this.clonedProducts[product._id as string];
  }
  getSeverity(status: boolean | string) {
    if (status === true || status === 'true') return 'success';
    if (status === false || status === 'false') return 'warn';
    if (status === 'admin') return 'danger';
    return 'info';
  }

  onDelete(product: IgetUser) {
    const id = product._id
    this.deleteUser.emit(id)
  }
}
