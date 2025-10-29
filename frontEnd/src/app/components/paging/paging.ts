import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-paging',
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './paging.html',
  styleUrl: './paging.scss',
  standalone: true
})
export class Paging {

  @Input() pagin: { totalPage: number; currentPage: number | null } = { totalPage: 1, currentPage: 1 };
  @Output() changePage = new EventEmitter()
  faLeft = faArrowLeft
  faRight = faArrowRight

  nextPage() {
    if (this.pagin.currentPage! < this.pagin.totalPage) {
      this.pagin.currentPage!++;
      this.changePage.emit(this.pagin.currentPage);
    }
  }

  prevPage() {
    if (this.pagin.currentPage! > 1) {
      this.pagin.currentPage!--;
      this.changePage.emit(this.pagin.currentPage);
    }
  }
}
