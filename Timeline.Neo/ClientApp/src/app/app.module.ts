import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {CommonModule, registerLocaleData} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import en from '@angular/common/locales/en-GB';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./login/login.component";
import {TeamsComponent} from "./dashboard/teams/teams.component";
import {TimelineComponent} from "./dashboard/timeline/timeline.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTabsModule} from "@angular/material/tabs";
import {JobListComponent} from "./job/job-list/job-list.component";
import {LinerJobComponent} from "./job/liner-job/liner-job.component";
import {MatListModule} from "@angular/material/list";
import {BadgeComponent} from "./badge/badge.component";
import {TruncatePipe} from "./_helps/truncate.pipe";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FullJobComponent} from "./job/full-job/full-job.component";
import {TeamDashComponent} from "./team-dash/team-dash.component";
import {TeamNavComponent} from "./navs/team-nav/team-nav.component";
import {UserAvatarComponent} from "./user-avatar/user-avatar.component";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {CdkCopyToClipboard, ClipboardModule} from "@angular/cdk/clipboard";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NewComponent} from "./team/new/new.component";
import {NewBoardComponent} from "./team/board/new-board/new-board.component";
import {MatNativeDateModule} from "@angular/material/core";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {TimeFromPipeModule} from "ng-time-from-pipe";
import {MatMenuModule} from "@angular/material/menu";
import {BoardComponent} from "./team/board/board.component";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {BoardNavComponent} from "./navs/board-nav/board-nav.component";
import {JobComponent} from "./job/job.component";
import {DashboardNavComponent} from "./navs/dashboard-nav/dashboard-nav.component";
import {BacklogComponent} from "./team/backlog/backlog.component";
import {MatTreeModule} from "@angular/material/tree";
import {JoinTeamComponent} from "./team/join-team/join-team.component";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NewBacklogBoardComponent} from './backlog/new-backlog-board/new-backlog-board.component';
import {
  MAT_COLOR_FORMATS,
  NGX_MAT_COLOR_FORMATS,
  NgxMatColorPickerModule
} from "@angular-material-components/color-picker";
import {MatSelectModule} from "@angular/material/select";
import {TeamProgressComponent} from "./team/team-progress/team-progress.component";
import { RoadMapComponent } from './team/team-progress/road-map/road-map.component';
import { QuickJobComponent } from './team/board/quick-job/quick-job.component';
import {CdkTreeModule} from "@angular/cdk/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from "@angular/material/sidenav";
import { DeleteBoardDialogComponent } from './board/delete-board-dialog/delete-board-dialog.component';
import {BoardProgressComponent} from "./team/board/board-progress/board-progress.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CreateUserComponent} from "./login/create-user/create-user.component";


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    TeamsComponent,
    TimelineComponent,
    JobListComponent,
    LinerJobComponent,
    BadgeComponent,
    TruncatePipe,
    FullJobComponent,
    TeamDashComponent,
    TeamNavComponent,
    UserAvatarComponent,
    // CdkCopyToClipboard,
    NewComponent,
    NewBoardComponent,
    // MatLabel,
    BoardComponent,
    BoardNavComponent,
    JobComponent,
    DashboardNavComponent,
    BacklogComponent,
    JoinTeamComponent,
    NewBacklogBoardComponent,
    TeamProgressComponent,
    RoadMapComponent,
    QuickJobComponent,
    DeleteBoardDialogComponent,
    BoardProgressComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    CommonModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DragDropModule,
    TooltipModule.forRoot(),
    TimeFromPipeModule,
    MatMenuModule,
    ClipboardModule,
    ProgressbarModule.forRoot(),
    MatTreeModule,
    FontAwesomeModule,
    NgxMatColorPickerModule,
    MatSelectModule,
    CdkTreeModule,
    MatIconModule,
    MatExpansionModule,
    MatSidenavModule,
    NgxChartsModule,
    MatSlideToggleModule
  ],
  providers: [{provide: LOCALE_ID, useValue: "en-GB"}, {provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS}],
  bootstrap: [AppComponent],
})
export class AppModule
{
}
