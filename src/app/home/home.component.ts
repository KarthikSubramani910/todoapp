import { Component,ViewChild,ElementRef,OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms'
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild("searchValue") searchedValue:ElementRef;
  @ViewChild('login') signInForm: NgForm;
  defaultPageNumber=1;
  defaultSearchPageNumber=1;
  pageLength;
  searchPageLength;
  rowsLength:any;
  searchTable:boolean = false;
  loggedIn=false;
  
  constructor(private appService:AppService, 
    private currentRoute:ActivatedRoute, 
    private route: Router, 
    private elementRef: ElementRef, private authService:AuthService){
    }
    
    ngOnInit(){
    }

    ngAfterViewInit(){
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f7f7f9';
    }
    
    ngDoCheck(){
      this.pageLength = this.appService.getStudentDataLength()
      if(this.searchTable){
        this.searchPageLength = this.appService.getSearchedStudentDataLength(this.searchedValue.nativeElement.value);
      } 
      this.getStudentDetails();
    }

    logout(logout){
      this.loggedIn = logout;
      this.defaultPageNumber = 1;
    }
    
    onSubmit() {
      this.loggedIn = this.authService.login();
      this.defaultPageNumber=1;
      this.resetTable()
      this.signInForm.reset();
    }

    getStudentDetails(){
      return this.appService.getPaginationDetails(this.defaultPageNumber)
    }
    
    searchTheStudent(){
      this.searchTable = true;
      return this.appService.getSearchPaginationDetails(this.defaultSearchPageNumber,this.searchedValue.nativeElement.value);
    } 
    
    resetTable(){
      this.searchTable = false;
      this.searchedValue.nativeElement.value = ""
    }
    
    addStudent(){
      if(this.loggedIn){
      this.route.navigate(['student/add'])
      }else{
        this.route.navigate(['']);
      }
    }
    
    editStudent(index){
      if(this.loggedIn){
      this.route.navigate(['student/edit',index])
      this.appService.highlight(index)}
      else{
        this.route.navigate(['']);
      }
    }

    getPagination(index){
        this.defaultPageNumber = index;
    }

    nextPage(){
      this.defaultPageNumber=this.defaultPageNumber+1;
    }
    
    previousPage(){
      this.defaultPageNumber=this.defaultPageNumber-1;
    }

    getSearchPagination(index){
      this.defaultSearchPageNumber = index
    }

    nextSearchPage(){
      this.defaultSearchPageNumber=this.defaultSearchPageNumber+1;
    }
    
    previousSearchPage(){
      this.defaultSearchPageNumber=this.defaultSearchPageNumber-1;
    }
    
    deleteStudentDetail(value){
      this.appService.deleteStudentDetail(value);
      this.route.navigate([''],{relativeTo:this.currentRoute})
    }
  }
  