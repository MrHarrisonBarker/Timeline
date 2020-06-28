import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Job, JobPriority, JobType} from "../_models/job";
import {AuthService} from "../_services/auth.service";
import {TeamService} from "../_services/team.service";
import {Team} from "../_models/team";
import {JobService} from "../_services/job.service";
import {User} from "../_models/user";
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [{provide: BsDropdownConfig, useValue: {isAnimated: true, autoClose: true}}]
})
export class TeamComponent implements OnInit
{

  @Input()teamId: string;
  Team: Team;

  private filteredUsers: User[];
  Show: string = 'Board';

  constructor (private auth: AuthService, private teamService: TeamService,private jobService: JobService)
  {
    // auth.currentTeam.subscribe(selected =>
    // {
    //   if (selected)
    //   {
    //     this.teamId = selected;
    //     console.log('change team', this.teamId);
    //     this.teamService.getTeam(this.teamId).subscribe(team =>
    //     {
    //       console.log("Team", team);
    //       this.Team = team;
    //       this.filterUsers();
    //     })
    //   }
    // });


    this.jobService.removeEvent.subscribe(jobId =>
    {
      console.log('Removing job', jobId);
      this.Team.Jobs = this.Team.Jobs.filter(x => x.jobId != jobId);
    });

    this.jobService.priorityChange.subscribe((change: { jobId: string, priority: JobPriority }) =>
    {
      console.log('Priority change', change);
    });
  }

  ngOnInit ()
  {
    if (this.teamId != null)
    {
      this.teamService.getTeam(this.teamId).subscribe(team =>
      {
        console.log("Team", team);
        this.Team = team;
        this.filterUsers();
      });

      // this.teamService.getInviteToken().subscribe(inviteToken =>
      // {
      //   this.Team.inviteToken = inviteToken;
      // });
    }
  }

  private filterUsers (): void
  {
    this.filteredUsers = this.Team.TeamMembers.filter(x => x.id != this.Team.owner.id);
  }


}
