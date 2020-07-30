import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { AppService } from '../../../../services/app.service';
import {
  genderArr,
  statusArr,
  stdArr,
  studentInfo,
} from '../../../../assets/model/localstorage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todoedit',
  templateUrl: './todoedit.component.html',
  styleUrls: ['./todoedit.component.css'],
})
export class TodoeditComponent implements OnInit, OnDestroy {
  @ViewChild('studentEditForm') studentEditForm: NgForm;
  getStudent: studentInfo;
  getStudentId: number;
  genders = genderArr;
  statuses = statusArr;
  stds = stdArr;
  private editDataSubscription: Subscription;
  private highlightSubscription: Subscription;

  constructor(
    private route: Router,
    private currentRoute: ActivatedRoute,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.editDataSubscription = this.currentRoute.data.subscribe(
      (data: Data) => {
        this.getStudent = data['studentData'];
        this.getStudentId = +this.getStudent.id;
      }
    );

    this.highlightSubscription = this.appService.highlight.subscribe();
  }

  onSubmit() {
    this.appService.editStudentDetail(this.studentEditForm, this.getStudentId);
    this.studentEditForm.reset();
    this.route.navigate([''], { relativeTo: this.currentRoute });
    this.appService.highlight.next(false);
  }
  cancel() {
    this.route.navigate([''], { relativeTo: this.currentRoute });
    this.appService.highlight.next(false);
  }

  ngOnDestroy() {
    this.editDataSubscription.unsubscribe();
    this.highlightSubscription.unsubscribe();
  }
}
