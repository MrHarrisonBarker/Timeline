import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../_services/team.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../_services/auth.service";
import {WarehouseService} from "../../_services/warehouse.service";

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css']
})
export class JoinTeamComponent implements OnInit
{

  constructor (private teamService: TeamService, public dialogRef: MatDialogRef<JoinTeamComponent>,private auth:AuthService,private warehouse: WarehouseService)
  {
  }

  ngOnInit (): void
  {
  }

  join (inviteToken: string)
  {
    console.log(inviteToken);
    if (inviteToken != null && inviteToken != '')
    {
      this.teamService.joinTeam(inviteToken).subscribe(team =>
      {
        this.auth.User.employments.push(team);
        this.warehouse.Teams.push(team);
        this.dialogRef.close();
      });
    }
  }
}
