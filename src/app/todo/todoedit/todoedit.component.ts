import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Router, ActivatedRoute, Data, Params } from '@angular/router';
import { AppService } from '../../../services/app.service';
import {genderArr} from "../../../assets/model/localstorage"


@Component({
  selector: 'app-todoedit',
  templateUrl: './todoedit.component.html',
  styleUrls: ['./todoedit.component.css']
})
export class TodoeditComponent implements OnInit {
  @ViewChild('studentEditForm') studentEditForm: NgForm;
  getStudent : {id:string,name:string,std:string,status:string,gender:string};
  getStudentId:number;
  genders=genderArr
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
      }
      
      onSubmit() {
        this.submitted = true;
        this.appService.editStudentDetail(this.studentEditForm,this.getStudentId)
        this.studentEditForm.reset();
        this.route.navigate([''],{relativeTo:this.currentRoute})
      }
      cancel(){
        this.cancelled = true;
        this.route.navigate([''],{relativeTo:this.currentRoute});
      }
    }
    