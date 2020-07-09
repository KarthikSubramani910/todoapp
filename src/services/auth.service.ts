import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable()
export class AuthService {
  loggedIn;
  signedIn: Subject<boolean> = new Subject();
  constructor(private route: Router) {}

  authenticatedSubject() {
    this.signedIn.subscribe((login: boolean) => {
      this.loggedIn = login;
    });
    return this.loggedIn;
  }
}
