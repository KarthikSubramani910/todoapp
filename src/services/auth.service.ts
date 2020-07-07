import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService{
    loggedIn = false;
    
    constructor(private route:Router){ 
    }
    
    authenticated(){
        return this.loggedIn;
    }
    login(){
        this.loggedIn = true;
        return this.loggedIn
    }
    
    logout(){
        this.loggedIn = false;
        return this.loggedIn;
    }
}