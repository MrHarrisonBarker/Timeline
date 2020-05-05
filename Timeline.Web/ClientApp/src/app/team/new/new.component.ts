import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../_services/team.service";
import {Team} from "../../_models/team";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit
{

  constructor (private teamService: TeamService, private bsModalRef: BsModalRef)
  {
  }

  ngOnInit (): void
  {
  }

  newTeam (name: string, avatar: string)
  {
    let team: Team = {
      name: name,
      avatarUrl: avatar
    };
    console.log('new team', team);
    this.teamService.newTeam(team).subscribe(team => {
      console.log('team on new comp', team);
      this.bsModalRef.hide();
    });
  }
}
