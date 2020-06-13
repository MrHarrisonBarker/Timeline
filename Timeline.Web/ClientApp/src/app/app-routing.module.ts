import {UserComponent} from "./user/user.component";
import {AuthGuard} from "./_guards/auth.guard";
import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TeamDashComponent} from "./team-dash/team-dash.component";
import {BoardComponent} from "./team/board/board.component";
import {ConfigComponent} from "./team/config/config.component";
import {BoardConfigComponent} from "./team/board/board-config/board-config.component";
import {VaultComponent} from "./team/vault/vault.component";
import {AuditComponent} from "./team/audit/audit.component";
import {UsersComponent} from "./team/users/users.component";
import {SuperGuard} from "./_guards/super.guard";
import {TeamProgressComponent} from "./team/team-progress/team-progress.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  // {
  //   path: 'dashboard',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
  // },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'superadmin',
    canActivate: [AuthGuard, SuperGuard],
    loadChildren: () => import('./superAdmin/super-admin.module').then(mod => mod.SuperAdminModule)
  },
  {
    path: 'team/:id',
    canActivate: [AuthGuard],
    component: TeamDashComponent,
  },
  {
    path: 'team/:id/config',
    canActivate: [AuthGuard],
    component: ConfigComponent
  },
  {
    path: 'team/:id/vault',
    canActivate: [AuthGuard],
    component: VaultComponent
  },
  {
    path: 'team/:id/progress',
    canActivate: [AuthGuard],
    component: TeamProgressComponent
  },
  {
    path: 'team/:id/audit',
    canActivate: [AuthGuard],
    component: AuditComponent
  },
  {
    path: 'team/:id/users',
    canActivate: [AuthGuard],
    component: UsersComponent
  },
  {
    path: 'team/:id/board/:boardId',
    canActivate: [AuthGuard],
    component: BoardComponent,
  },
  {
    path: 'team/:id/board/:boardId/config',
    canActivate: [AuthGuard],
    component: BoardConfigComponent
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    component: UserComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule
{
}
