import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable()
export class AuthService {
  signedIn: Subject<boolean> = new Subject();
  constructor(private route: Router) {}

  authenticatedSubject(): Observable<boolean> {
    return this.signedIn;
  }
}
