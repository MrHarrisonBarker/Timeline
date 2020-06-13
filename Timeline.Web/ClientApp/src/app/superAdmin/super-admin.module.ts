import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users/users.component';
import {TeamsComponent} from './teams/teams.component';
import {SocketComponent} from './socket/socket.component';
import {SuperAdminDashboardComponent} from './super-admin-dashboard/super-admin-dashboard.component';
import {SuperAdminRouting} from "./super-admin-routing.module";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    UsersComponent,
    TeamsComponent,
    SocketComponent,
    SuperAdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    SuperAdminRouting,
    MatTableModule,
    SharedModule,
  ]
})
export class SuperAdminModule
{
}
