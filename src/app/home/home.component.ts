import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  DoCheck,
  OnChanges,
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
export class HomeComponent implements OnInit, AfterViewInit {
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

  ngOnInit() {
    let studentDetails = this.getStudentDetails(this.searchValue);
    this.pageLength = this.paginationService.getStudentDataLength(
      this.searchValue,
      studentDetails
    );
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

  getStudentDetails(searchValue) {
    let studentDetails = this.paginationService.getPaginationDetails(
      this.defaultPageNumber,
      searchValue
    );
    this.pageLength = this.paginationService.getStudentDataLength(
      this.searchValue,
      studentDetails
    );
    return studentDetails;
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
