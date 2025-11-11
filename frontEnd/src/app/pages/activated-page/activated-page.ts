import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-activated-page',
  imports: [ButtonModule, RouterLink],
  templateUrl: './activated-page.html',
  styleUrl: './activated-page.scss'
})
export class ActivatedPage implements OnInit {
  activate!: boolean
  isLoading!: boolean
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || ''
    this.activated(id)
  }

  async activated(id: string) {
    this.isLoading = true
    const res = await this.authService.activetedEmail(id)
    if (res.isActive) {
      this.activate = res.isActive
    }
    this.isLoading = false
  }
}
