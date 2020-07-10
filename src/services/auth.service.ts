import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private route: Router) {}

  authenticated() {
    return this.signedIn.getValue();
  }
}
