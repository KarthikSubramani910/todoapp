import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-todoadd',
  templateUrl: './todoadd.component.html',
  styleUrls: ['./todoadd.component.css']
})
export class TodoaddComponent implements OnInit {
  @ViewChild('f') signUpForm: NgForm;
  genders=this.appService.gender;
  defaultValue:string = "male";
  submitted=false;
  cancelled=false;

  constructor(private route:Router, private currentRoute:ActivatedRoute, private appService:AppService) { }

  ngOnInit(): void {
    this.appService.highlightColor();
  }
  


  onSubmit() {
    this.submitted = true;
    this.appService.addStudentDetail(this.signUpForm)
    this.signUpForm.reset();
    setTimeout(()=>{this.route.navigate([''],{relativeTo:this.currentRoute})},1000);
  }
  cancel(){
    this.cancelled = true;
    setTimeout(()=>{this.route.navigate([''],{relativeTo:this.currentRoute})},1000);
  }

}
