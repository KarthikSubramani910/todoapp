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
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('login') signInForm: NgForm;

  loggedIn: boolean = false;
  studentId: number;
  searchedValue: string = '';
  reverse = true;
  defaultPageNumber = 1;
  pageLength;
  searchValue: Subject<string> = new Subject();
  private authSubscription: Subscription;
  private searchSubscription: Subscription;

  constructor(
    private appService: AppService,
    private route: Router,
    private elementRef: ElementRef,
    private authService: AuthService,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.signedIn.subscribe(
      (signed: boolean) => {
        this.loggedIn = signed;
      }
    );
    this.searchSubscription = this.searchValue
      .pipe(debounceTime(500))
      .subscribe((search: string) => {
        this.searchedValue = search;
      });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#f7f7f9';
  }

  onSubmit() {
    this.authService.signedIn.next(true);
    this.defaultPageNumber = 1;
    this.searchedValue = '';
    this.signInForm.reset();
  }

  getStudentDetails() {
    let studentSearch = this.paginationService.getPaginationDetails(
      this.searchedValue,
      this.defaultPageNumber
    );
    this.defaultPageNumber = studentSearch['pageNumber'];
    this.pageLength = studentSearch['noOfPages'];
    return studentSearch['studentData'];
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
    this.authSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }
}
