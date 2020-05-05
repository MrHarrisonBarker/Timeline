import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAvatarComponent} from "../user-avatar/user-avatar.component";
import {TimeFromPipeModule} from "ng-time-from-pipe";
import {TruncatePipe} from "../_helps/truncate.pipe";
import {OcticonDirective} from "../_helps/octicon.directive";
import { BadgeComponent } from '../badge/badge.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ModalModule} from "ngx-bootstrap/modal";



@NgModule({
  declarations: [
    UserAvatarComponent,
    OcticonDirective,
    TruncatePipe,
    BadgeComponent
  ],
  exports: [
    UserAvatarComponent,
    TimeFromPipeModule,
    TooltipModule,
    OcticonDirective,
    TruncatePipe,
    ModalModule,
    BadgeComponent
  ],
  imports: [
    CommonModule,
    TimeFromPipeModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ]
})
export class SharedModule { }
