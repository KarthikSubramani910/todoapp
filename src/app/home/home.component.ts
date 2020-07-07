import { Component,ViewChild,ElementRef,OnInit, AfterViewInit, DoCheck, OnChanges } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms'
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('login') signInForm: NgForm;
  searchValue=""
  loggedIn=false;
  studentId:number;
  highlight = false;

  
  constructor(private appService:AppService,
    private currentRoute:ActivatedRoute, 
    private route: Router, 
    private elementRef: ElementRef, 
    private authService:AuthService){
    }
    
    ngAfterViewInit(){
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f7f7f9';
    }
    
    ngOnInit(){
      this.searchTheStudentDetailsLatest(this.searchValue);
      this.highlight = false;
    }
    
    logout(logout){
      this.loggedIn = logout;
    }
    
    onSubmit() {
      this.loggedIn = this.authService.login();
      this.signInForm.reset();
    }
    
    searchTheStudentDetailsLatest(searchValue){
      return this.appService.searchStudentDetailsLatest(searchValue);
    }     
    
    addStudent(){
      this.route.navigate(['student/add'])
    }
    
    editStudent(index){
      this.route.navigate(['student/edit',index])
      this.highlight = true;
      this.highlight === true ?this.studentId = index:this.studentId = 0;
    }
    
    deleteStudentDetail(value){
      this.appService.deleteStudentDetail(value);
      this.route.navigate([''],{relativeTo:this.currentRoute})
    }
  }