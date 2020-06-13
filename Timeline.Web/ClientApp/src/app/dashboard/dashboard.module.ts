import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {SharedModule} from "../shared/shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {JobComponent} from "../job/job.component";
import {FullJobComponent} from "../job/full-job/full-job.component";
import {TimelineComponent} from "./timeline/timeline.component";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TeamComponent} from "../team/team.component";
import {NewJobComponent} from "../team/new-job/new-job.component";
import {NewComponent} from '../team/new/new.component';
import {JoinTeamComponent} from "../team/join-team/join-team.component";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {ConfigComponent} from '../team/config/config.component';
import {ConfigBarComponent} from './config-bar/config-bar.component';
import {UsersComponent} from "../team/users/users.component";
import {BoardComponent} from "../team/board/board.component";
import {AuditComponent} from '../team/audit/audit.component';
import {DeadlineComponent} from '../team/deadline/deadline.component';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/moment";
import {UserComponent} from "../user/user.component";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {AlertModule} from "ngx-bootstrap/alert";
import { TeamsComponent } from './teams/teams.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ],
  entryComponents: [FullJobComponent]
})
export class DashboardModule
{
}
