import { Component, OnInit } from '@angular/core';
import { TodoCard } from '../../components/todo-card/todo-card';
import { IgetUser, Ipaging, Itodo } from '../../models/user';
import { TodoService } from '../../service/todo.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Dialog } from '../../components/dialog/dialog';
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
import { faAdd, faChevronLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Paging } from "../../components/paging/paging";
import { NavbarComponent } from "../../components/navbar/navbar";
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { Auth } from '../../state/auth';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoCard, FontAwesomeModule, Dialog, ToastModule, Paging, NavbarComponent, ConfirmDialog, NgxSkeletonLoaderModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  providers: [MessageService]
})

export class Home implements OnInit {
  constructor(private todo: TodoService, private messageService: MessageService, private auth: AuthService, private route: Router, private me: Auth) {
    this.me.user$.subscribe(u => {
      this.user = u
    })
  }

  ngOnInit(): void {
    this.getTodos()
    this.auth.getMe()
    this.getAll()
  }


  showDialog: boolean = false
  faAdd = faAdd
  faLeft = faChevronLeft
  faRight = faChevronRight
  faSearch = faSearch
  pagingDate: { total: number; res: any[] } = { total: 0, res: [] };
  findOneDate = {}
  isEditing = false
  confirmDialog = false
  paging: Ipaging = {
    page: 1,
    size: 9,
    priority: null,
    isCompleted: false
  }
  totalPage: number = 0
  users: IgetUser[] | any = null
  isLoading: boolean = true
  user!: IgetUser | null
  isLoadingMail!: boolean
  //************************************* functions */
  async getTodos() {
    const res = await this.todo.getTodo(this.paging)
    this.pagingDate = res
    this.totalPage = Math.ceil((this.pagingDate.total ?? 0) / (this.paging.size ?? 1));
    this.isLoading = false
  }

  async createTodo(data: Itodo) {
    try {
      const res = await this.todo.createTodo(data);

      if (res?._id) {

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Todo successfully created!',
        });
        this.showDialog = false;
        await this.getTodos();
      } else {

        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Something went wrong, please try again.',
        });
      }

    } catch (error) {
      console.error(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create todo.',
      });
    }
  }


  async deleteTodo(id: string) {
    try {
      const res = await this.todo.deleteTodo(id)
      if (res?._id) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Todo successfully deleted!',
        });
        await this.getTodos()
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Something went wrong, please try again.',
        });
      }
    } catch (error) {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete todo.'
      })
    }
  }

  async submitEdit(date: any) {
    try {
      const res = await this.todo.edit(date._id, date)
      if (res?._id) {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Todo seccessfully editing.'
        })
        this.closeDialog()
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Something went wrong, please try again.'
        })
      }
      await this.getTodos()
    } catch (error) {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to edit todo.',
      });
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.todo.findOne(id);
      this.showDialog = true
      this.isEditing = true
      this.findOneDate = res;
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logout() {
    const res = await this.auth.logout()
    this.route.navigate(['/login'])
    localStorage.removeItem('accessToken')
  }

  async getAll() {
    this.users = await this.auth.getAllUser()
  }

  async sendLinkEmail() {
    this.isLoadingMail = true
    const res = await this.auth.sendLinkEmail(this.user?._id ?? '')
    if (res) {
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: res.message
      })
    }
    this.isLoadingMail = false
  }
  // helper  functions
  gotoProfil() {
    this.route.navigate(['/profil'])
  }

  openCreateDialog() {
    this.showDialog = true
  }

  closeDialog() {
    this.showDialog = false;
    this.isEditing = false;
    this.findOneDate = {}
  }

  changePage(page: number) {
    this.paging.page = page
    this.getTodos()
  }
}
