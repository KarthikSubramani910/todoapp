import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../../services/app.service';
import {
  genderArr,
  statusArr,
  stdArr,
} from '../../../../assets/model/localstorage';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-todoadd',
  templateUrl: './todoadd.component.html',
  styleUrls: ['./todoadd.component.css'],
})
export class TodoaddComponent {
  @ViewChild('f') signUpForm: NgForm;
  genders = genderArr;
  status = '';
  statuses = statusArr;
  std = '';
  stds = stdArr;

  constructor(
    private route: Router,
    private currentRoute: ActivatedRoute,
    private appService: AppService,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.appService.addStudentDetail(this.signUpForm);
    this.signUpForm.reset();
    this.route.navigate([''], { relativeTo: this.currentRoute });
  }

  cancel() {
    this.route.navigate([''], { relativeTo: this.currentRoute });
  }
}
