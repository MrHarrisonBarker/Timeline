import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../_services/team.service";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css']
})
export class JoinTeamComponent implements OnInit
{

  constructor (private teamService: TeamService,public bsModalRef: BsModalRef)
  {
  }

  ngOnInit (): void
  {
  }

  join (inviteToken: string)
  {
    this.teamService.joinTeam(inviteToken).subscribe(out =>
    {
      console.log(out);
      this.bsModalRef.hide();
    });
  }
}
