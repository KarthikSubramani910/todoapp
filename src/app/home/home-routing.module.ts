import {Routes, RouterModule} from '@angular/router'
import { NgModule } from '@angular/core';
import {TodoaddComponent} from '../todoadd/todoadd.component'
import { TodoeditComponent } from '../todoedit/todoedit.component';
import { todoEditResolver } from '../todoedit-resolver.service';
import { HomeComponent } from '../home/home.component';
import {PagenotfoundComponent} from '../pagenotfound/pagenotfound.component'
import { AuthGuard } from '../auth-guard.service';
const routes:Routes = [
    {path:"",component:HomeComponent, canActivateChild:[AuthGuard],
    children:[{path:"student/add",component:TodoaddComponent},
    {path:"student/edit/:id",component:TodoeditComponent, resolve:{studentData:todoEditResolver}, 
    }
]},
{path:"not-found",component:PagenotfoundComponent, data:{message: 'page not found'}},
{path:"**",redirectTo:'not-found'},
]

@NgModule({
    imports:[RouterModule.forRoot(routes,{useHash:true})],
    exports:[RouterModule]
})

export class HomeRoutingModule{
}