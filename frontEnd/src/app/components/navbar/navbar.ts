import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Auth } from '../../state/auth';
import { IgetUser } from '../../models/user';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
// 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TieredMenuModule, ButtonModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  user: IgetUser | null = null
  baseApi = environment.baseApi + '/static/'

  constructor(private auth: Auth, private route: Router) {
    this.auth.user$.subscribe(user => {
      this.user = user
    })
  }
  @Output() logout = new EventEmitter<void>();
  @Output() profil = new EventEmitter<void>();
  ngOnInit(): void {
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => this.goToProfile()
      },
      {
        label: 'chat',
        icon: 'pi pi-cog',
        command: () => this.route.navigate(['chat'])
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logoutEmit()
      },
    ];
  }

  goToProfile() {
    this.profil.emit();
  }

  logoutEmit() {
    this.logout.emit();
  }

} 
