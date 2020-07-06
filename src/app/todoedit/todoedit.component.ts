import { Component, OnInit,ViewChild, DoCheck } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Router, ActivatedRoute, Data, Params } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-todoedit',
  templateUrl: './todoedit.component.html',
  styleUrls: ['./todoedit.component.css']
})
export class TodoeditComponent implements OnInit, DoCheck {
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
    // this.currentRoute.data.subscribe(
    //   (data:Data)=>{
    //     this.getStudent = data['studentData']
    //   }
    // );
    this.currentRoute.params.subscribe(
      (params:Params)=>{
        this.getStudentId = +params['id'];
      }
    );
    this.appService.highlight(this.getStudentId)
  }
  
  ngDoCheck(){

    this.currentRoute.data.subscribe(
      (data:Data)=>{
        this.getStudent = data['studentData']
      }
    );
      console.log("SelectedDetails",this.getStudent)

    // this.studentEditForm.setValue({
    //   studentData:{
    //     username: "Karthik",
    //     std: "12",
    //     status:"Pass",
    //     gender:"Male"
    //   } 
    // });

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
