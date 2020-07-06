import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService{
    deactivate = false;
    loggedIn = false;
    constructor(private route:Router){

    }
    authenticated(){
        const promise = new Promise((resolve,reject)=>{
            setTimeout(()=>{resolve(this.loggedIn);},50);
        });
        return promise;
    }

    login(){
        this.loggedIn = true;
        return this.loggedIn
    }

    logout(result?:boolean){
        this.loggedIn = false;
        return this.loggedIn;
    }
}