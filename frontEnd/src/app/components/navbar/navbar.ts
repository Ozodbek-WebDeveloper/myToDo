import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TieredMenuModule, ButtonModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

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
        label: 'Settings',
        icon: 'pi pi-cog',
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
