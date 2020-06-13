import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAvatarComponent} from "../user-avatar/user-avatar.component";
import {TimeFromPipeModule} from "ng-time-from-pipe";
import {TruncatePipe} from "../_helps/truncate.pipe";
import {OcticonDirective} from "../_helps/octicon.directive";
import { BadgeComponent } from '../badge/badge.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ModalModule} from "ngx-bootstrap/modal";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DashboardNavComponent} from "../navs/dashboard-nav/dashboard-nav.component";
import {AppRoutingModule} from "../app-routing.module";
import {MatMenuModule} from "@angular/material/menu";
import {TeamNavComponent} from "../navs/team-nav/team-nav.component";



@NgModule({
  declarations: [
    UserAvatarComponent,
    OcticonDirective,
    TruncatePipe,
    BadgeComponent,
    TeamNavComponent,
    DashboardNavComponent,
  ],
  exports: [
    UserAvatarComponent,
    TimeFromPipeModule,
    TooltipModule,
    OcticonDirective,
    TruncatePipe,
    ModalModule,
    BadgeComponent,
    MatTooltipModule,
    CommonModule,

    DashboardNavComponent,
    MatMenuModule,
    TeamNavComponent
  ],
  imports: [
    CommonModule,
    TimeFromPipeModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatTooltipModule,
    MatMenuModule,
  ]
})
export class SharedModule { }
