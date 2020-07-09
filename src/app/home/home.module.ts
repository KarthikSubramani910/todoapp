import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from '../home/home-routing.module'
import { HomeComponent } from './home.component';
import { AppService } from '../../services/app.service';
import { TodoaddComponent } from '../todo/todoadd/todoadd.component';
import { TodoeditComponent } from '../todo/todoedit/todoedit.component';
import { FormsModule} from '@angular/forms'
import {todoEditResolver} from '../../resolvers/todoedit.resolver';
import {SigninComponent} from '../signin/signin.component'
import {AuthService} from '../../services/auth.service'
import {PagenotfoundComponent} from "../pagenotfound/pagenotfound.component"
import { AuthGuard } from '../../guards/auth.guard';
import {PaginationService} from '../../services/pagination.service'




@NgModule({
    declarations: [HomeComponent,
        TodoaddComponent,
        TodoeditComponent,
        SigninComponent,
        PagenotfoundComponent
    ],
    imports:[CommonModule, HomeRoutingModule, FormsModule],
    providers:[AppService,todoEditResolver, PaginationService, AuthService, AuthGuard]
})
export class HomeModule{
    
}