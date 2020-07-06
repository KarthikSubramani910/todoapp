import { Component,ViewChild,ElementRef,OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms'
import { AuthService } from '../auth.service';
import { PaginationService } from '../pagination.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements DoCheck, AfterViewInit {
  @ViewChild("searchValue") searchedValue:ElementRef;
  @ViewChild('login') signInForm: NgForm;
  defaultPageNumber=1;
  defaultSearchPageNumber=1;
  pageLength;
  searchPageLength;
  rowsLength:any;
  searchTable:boolean = false;
  loggedIn=false;
  reverse=true;
  search = true;
  
  constructor(private appService:AppService,
    private paginationService:PaginationService, 
    private currentRoute:ActivatedRoute, 
    private route: Router, 
    private elementRef: ElementRef, private authService:AuthService){
    }
    
    ngAfterViewInit(){
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f7f7f9';
    }
    
    ngDoCheck(){
      this.pageLength = this.paginationService.getStudentDataLength()
      if(this.searchTable){
        this.searchPageLength = this.paginationService.getSearchedStudentDataLength(this.searchedValue.nativeElement.value);
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
      return this.paginationService.getPaginationDetails(this.defaultPageNumber)
    }
    
    searchTheStudent(){
      this.searchTable = true;
      return this.paginationService.getSearchPaginationDetails(this.defaultSearchPageNumber,this.searchedValue.nativeElement.value);
    } 
    
    resetTable(){
      this.searchTable = false;
      this.searchedValue.nativeElement.value = ""
    }
    
    addStudent(){
      this.route.navigate(['student/add'])
    }
    
    editStudent(index){
      this.route.navigate(['student/edit',index])
      this.appService.highlight(index)
    }
    
    deleteStudentDetail(value){
      this.appService.deleteStudentDetail(value);
      this.route.navigate([''],{relativeTo:this.currentRoute})
    }
    
    getPagination(index,search){
      search? this.defaultSearchPageNumber = index:this.defaultPageNumber = index;
    }
    
    page(reverse,search){
      search?(reverse?this.defaultSearchPageNumber--:this.defaultSearchPageNumber++):
      (reverse?this.defaultPageNumber--:this.defaultPageNumber++)        
    }
}