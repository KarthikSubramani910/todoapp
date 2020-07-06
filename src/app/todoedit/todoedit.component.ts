import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Router, ActivatedRoute, Data, Params } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-todoedit',
  templateUrl: './todoedit.component.html',
  styleUrls: ['./todoedit.component.css']
})
export class TodoeditComponent implements OnInit {
  @ViewChild('studentEditForm') studentEditForm: NgForm;
  getStudent : {id:string,name:string,std:string,status:string,gender:string};
  getStudentId:number;
  genders=this.appService.gender;
  submitted=false;
  cancelled=false;
  
  constructor(private route:Router,
    private currentRoute:ActivatedRoute, 
    private appService:AppService) { }

  ngOnInit(): void {
    this.currentRoute.data.subscribe(
      (data:Data)=>{
        this.getStudent = data['studentData']
        this.getStudentId = +this.getStudent.id
      }
    );
    this.appService.highlight(this.getStudentId)
  }
  

  onSubmit() {
    this.submitted = true;
    this.appService.editStudentDetail(this.studentEditForm,this.getStudentId)
    this.studentEditForm.reset();
    setTimeout(()=>{this.route.navigate([''],{relativeTo:this.currentRoute})},1000);
  }
  cancel(){
    this.cancelled = true;
    this.appService.highlightColor();
    setTimeout(()=>{this.route.navigate([''],{relativeTo:this.currentRoute})},1000);
  }
}
