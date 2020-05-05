import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {LoginComponent} from "./login/login.component";
import {HomeRoutingModule} from "./home-routing.module";
import {AlertModule} from "ngx-bootstrap/alert";
import { CreateUserComponent } from '../login/create-user/create-user.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CreateUserComponent,
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        AlertModule.forRoot()
    ]
})
export class HomeModule { }
