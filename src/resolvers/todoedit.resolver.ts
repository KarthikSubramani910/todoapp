import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppService } from '../services/app.service';

interface studentInfo {
  id: string;
  name: string;
  std: string;
  status: string;
  gender: string;
}

@Injectable()
export class todoEditResolver implements Resolve<studentInfo> {
  constructor(private appService: AppService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<studentInfo> | Promise<studentInfo> | studentInfo {
    return this.appService.getStudentDetail(route.params['id']);
  }
}
