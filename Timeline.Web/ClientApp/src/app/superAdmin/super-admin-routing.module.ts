import {RouterModule, Routes} from "@angular/router";
import {SuperAdminDashboardComponent} from "./super-admin-dashboard/super-admin-dashboard.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
  { path: '', component: SuperAdminDashboardComponent },

];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class SuperAdminRouting
{
}
