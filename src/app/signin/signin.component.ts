import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @Output() signedIn = new EventEmitter<boolean>(); 
  
  constructor(private route:Router,
    private authService:AuthService, 
    private currentRoute:ActivatedRoute) { }
    
    ngOnInit(): void {
    }
    
    logout(){
      this.signedIn.emit(this.authService.logout());
      this.route.navigate([''],{relativeTo:this.currentRoute})
    }
  }
  