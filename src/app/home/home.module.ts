import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from '../home/home-routing.module'
import { HomeComponent } from './home.component';
import { AppService } from '../app.service';
import { TodoaddComponent } from '../todoadd/todoadd.component';
import { TodoeditComponent } from '../todoedit/todoedit.component';
import { FormsModule} from '@angular/forms'
import {todoEditResolver} from '../todoedit-resolver.service';
import {SigninComponent} from '../signin/signin.component'
import {AuthService} from '../auth.service'
import {PagenotfoundComponent} from "../pagenotfound/pagenotfound.component"
import { AuthGuard } from '../auth-guard.service';
import {PaginationService} from '../pagination.service'


@NgModule({
    declarations: [HomeComponent,
    TodoaddComponent,
    TodoeditComponent,
    SigninComponent,
    PagenotfoundComponent],
    imports:[CommonModule, HomeRoutingModule, FormsModule],
    providers:[AppService,todoEditResolver,AuthService, AuthGuard, PaginationService]
})
export class HomeModule{

}