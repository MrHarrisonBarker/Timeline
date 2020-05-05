import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {Team} from "../../_models/team";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {NewComponent} from "../../team/new/new.component";
import {JoinTeamComponent} from "../../team/join-team/join-team.component";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit
{
  newTeamRef: BsModalRef;
  joinTeamRef: BsModalRef;
  @Input() Teams: Team[];
  open: boolean = true;
  configOpen: boolean = false;

  constructor (private authService: AuthService, private modalService: BsModalService)
  {
    this.authService.addTeam.subscribe(team =>
    {
      console.log('pushing team', team);
      this.Teams.push(team);
    });

    this.authService.removeTeam.subscribe(team =>
    {
      console.log('leaving team', team);
      this.Teams = this.Teams.filter(x => x.id != team.id);
    });
  }

  ngOnInit ()
  {
  }

  changeTeam (teamId: string)
  {
    console.log('change teams', teamId);
    this.authService.CurrentTeam = teamId;
    this.authService.showDash.emit('Team');
    this.authService.currentTeam.emit(teamId);
    this.toggleSideBar();
  }

  toggleTimeline ()
  {
    this.authService.showDash.emit('Timeline');
  }

  toggleSideBar ()
  {
    this.open = !this.open;
  }

  newTeam ()
  {
    this.newTeamRef = this.modalService.show(NewComponent, {class: "modal-lg"});
    this.newTeamRef.content.closeBtnName = 'Close';
  }

  joinTeam ()
  {
    this.joinTeamRef = this.modalService.show(JoinTeamComponent, {class: "modal-lg"});
    this.joinTeamRef.content.closeBtnName = 'Close';
  }

  toggleConfigBar ()
  {
    this.authService.toggleConfigBar.emit();
    this.configOpen = !this.configOpen;
  }

  openUser ()
  {
    this.authService.showDash.emit('User');
  }
}
