import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private route: Router,
    private authService: AuthService,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.authService.signedIn.subscribe();
  }

  logout() {
    this.authService.signedIn.next(false);
    this.route.navigate([''], { relativeTo: this.currentRoute });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
