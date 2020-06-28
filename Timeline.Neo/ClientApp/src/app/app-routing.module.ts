import {AuthGuard} from "./_guards/auth.guard";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {TeamDashComponent} from "./team-dash/team-dash.component";
import {BoardComponent} from "./team/board/board.component";
import {BacklogComponent} from "./team/backlog/backlog.component";
import {TeamProgressComponent} from "./team/team-progress/team-progress.component";
import {BoardProgressComponent} from "./team/board/board-progress/board-progress.component";
import {TeamResolverService} from "./_resolvers/team-resolver.service";
import {BoardResolverService} from "./_resolvers/board-resolver.service";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'team/:teamId',
    canActivate: [AuthGuard],
    component: TeamDashComponent,
    resolve: {team: TeamResolverService}
  },
  {
    path: 'team/:teamId/board/:boardId',
    canActivate: [AuthGuard],
    component: BoardComponent,
    resolve: {board: BoardResolverService}
  },
  {
    path: 'team/:teamId/backlog',
    canActivate: [AuthGuard],
    component: BacklogComponent
  },
  {
    path: 'team/:teamId/progress',
    canActivate: [AuthGuard],
    component: TeamProgressComponent
  },
  {
    path: 'team/:teamId/board/:boardId/progress',
    canActivate: [AuthGuard],
    component: BoardProgressComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule
{
}
