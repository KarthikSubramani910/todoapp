import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PaginationService } from 'src/services/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('login') signInForm: NgForm;

  loggedIn: boolean = false;
  studentId: number;
  searchValue = '';
  reverse = true;
  defaultPageNumber = 1;
  pageLength;
  private subscription: Subscription;

  constructor(
    private appService: AppService,
    private route: Router,
    private elementRef: ElementRef,
    private authService: AuthService,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.signedIn.subscribe(
      (signed: boolean) => {
        this.loggedIn = signed;
      }
    );
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#f7f7f9';
  }

  onSubmit() {
    this.authService.signedIn.next(true);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
