import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {SharedModule} from "./shared/shared.module";
import {CommonModule, registerLocaleData} from "@angular/common";
import {TeamDashComponent} from './team-dash/team-dash.component';
import {MatListModule} from "@angular/material/list";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {JobComponent} from "./job/job.component";
import {FullJobComponent} from "./job/full-job/full-job.component";
import {TimelineComponent} from "./dashboard/timeline/timeline.component";
import {SideBarComponent} from "./dashboard/side-bar/side-bar.component";
import {NewJobComponent} from "./team/new-job/new-job.component";
import {TeamComponent} from "./team/team.component";
import {NewComponent} from "./team/new/new.component";
import {JoinTeamComponent} from "./team/join-team/join-team.component";
import {ConfigComponent} from "./team/config/config.component";
import {ConfigBarComponent} from "./dashboard/config-bar/config-bar.component";
import {UsersComponent} from "./team/users/users.component";
import {VaultComponent} from "./team/vault/vault.component";
import {AuditComponent} from "./team/audit/audit.component";
import {DeadlineComponent} from "./team/deadline/deadline.component";
import {UserComponent} from "./user/user.component";
import {BoardComponent} from "./team/board/board.component";
import {TeamsComponent} from "./dashboard/teams/teams.component";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {AlertModule} from "ngx-bootstrap/alert";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/moment";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {NavComponent} from './nav/nav.component';
import {DashboardNavComponent} from './navs/dashboard-nav/dashboard-nav.component';
import {BoardNavComponent} from './navs/board-nav/board-nav.component';
// import {TeamNavComponent} from './navs/team-nav/team-nav.component';
import {LinerJobComponent} from './job/liner-job/liner-job.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {JobListComponent} from './job/job-list/job-list.component';
import {NewBoardComponent} from './team/board/new-board/new-board.component';
import {BoardConfigComponent} from './team/board/board-config/board-config.component';
import {AppRoutingModule} from "./app-routing.module";

import en from '@angular/common/locales/en-GB';
import {TeamProgressComponent} from "./team/team-progress/team-progress.component";
import {BoardProgressComponent} from "./team/board/board-progress/board-progress.component";
import {CompactBoardComponent} from "./team/board/compact-board/compact-board.component";
import {ListBoardComponent} from "./team/board/list-board/list-board.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {RouterModule} from "@angular/router";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TeamDashComponent,
    DashboardComponent,
    JobComponent,
    FullJobComponent,
    TimelineComponent,
    SideBarComponent,
    NewJobComponent,
    TeamComponent,
    NewComponent,
    JoinTeamComponent,
    ConfigComponent,
    ConfigBarComponent,
    UsersComponent,
    VaultComponent,
    AuditComponent,
    DeadlineComponent,
    UserComponent,
    BoardComponent,
    TeamsComponent,
    NavComponent,
    BoardNavComponent,
    // TeamNavComponent,
    LinerJobComponent,
    JobListComponent,
    NewBoardComponent,
    BoardConfigComponent,
    BoardProgressComponent,
    CompactBoardComponent,
    ListBoardComponent,
    TeamProgressComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    CommonModule,
    SharedModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,

    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    ProgressbarModule.forRoot(),
    MatButtonModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    ReactiveFormsModule,
    TimepickerModule.forRoot(),

    DragDropModule,
    AlertModule.forRoot(),
    FormsModule,
    ClipboardModule,
    BsDropdownModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // RouterModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: "en-GB"}],
  bootstrap: [AppComponent],
})
export class AppModule
{
}
