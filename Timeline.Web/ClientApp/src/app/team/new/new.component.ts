import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../_services/team.service";
import {Team} from "../../_models/team";
import {BsModalRef} from "ngx-bootstrap/modal";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit
{

  constructor (private teamService: TeamService,private auth: AuthService)
  {
  }

  ngOnInit (): void
  {
  }

  newTeam (name: string, avatar: string, accent: string, description: string)
  {
    let team: Team = {
      name: name,
      avatarUrl: avatar,
      accent: accent,
      description: description
    };
    console.log('new team', team);
    this.teamService.newTeam(team).subscribe(team =>
    {
      console.log('team on new comp', team);
      this.auth.User.Affiliations.push(team);
      // this.bsModalRef.hide();
    });
  }
}
