import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },

];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class HomeRoutingModule
{
}
