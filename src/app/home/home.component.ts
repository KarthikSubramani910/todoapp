import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PaginationService } from 'src/services/pagination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('login') signInForm: NgForm;
  loggedIn = false;
  studentId: number;
  searchValue = '';
  reverse = true;
  defaultPageNumber = 1;
  pageLength;

  constructor(
    private appService: AppService,
    private route: Router,
    private elementRef: ElementRef,
    private authService: AuthService,
    private paginationService: PaginationService
  ) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#f7f7f9';
  }

  logout(logout) {
    this.loggedIn = logout;
  }

  onSubmit() {
    this.loggedIn = this.authService.login();
    this.defaultPageNumber = 1;
    this.searchValue = '';
    this.signInForm.reset();
  }

  getStudentDetails(searchvalue) {
    this.searchValue = searchvalue;
    let studentSearch = this.paginationService.getPaginationDetails(
      searchvalue,
      this.defaultPageNumber
    );
    this.pageLength = studentSearch[1];
    return studentSearch[0];
  }

  addStudent() {
    this.route.navigate(['student/add']);
  }

  editStudent(index) {
    this.route.navigate(['student/edit', index]);
    this.studentId = index;
  }

  deleteStudentDetail(value) {
    this.appService.deleteStudentDetail(value);
  }

  getPagination(index) {
    this.defaultPageNumber = index;
  }

  page(reverse) {
    reverse ? this.defaultPageNumber-- : this.defaultPageNumber++;
  }
}
