import {Component, OnInit} from '@angular/core';
import {User} from "../../_models/user";
import {Team} from "../../_models/team";
import {Job} from "../../_models/job";
import {JobService} from "../../_services/job.service";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit
{

  Team: Team;
  InitialStatus: number;

  selectedUser: string;
  selectedUsers: User[] = [];
  deadlinePicker: Date;
  deadlineTime: Date;

  constructor (private jobService: JobService, public bsModalRef: BsModalRef)
  {
  }

  ngOnInit ()
  {
  }

  public newJob (name: string, description: string, deadline: string, jobStatus: number, jobType: number, jobPriority: number, url: string, commit: string): void
  {
    if (this.deadlinePicker)
    {
      this.deadlinePicker.setUTCHours(this.deadlineTime.getUTCHours());
      this.deadlinePicker.setUTCMinutes(this.deadlineTime.getUTCMinutes());
      this.deadlinePicker.setSeconds(0, 0);
    }
    let job: Job = {
      name: name,
      description: description,
      archived: false,
      finished: false,
      startDate: new Date(),
      deadline: this.deadlinePicker,
      jobStatus: jobStatus,
      jobType: jobType,
      priority: jobPriority,
      associatedUrl: url,
      commit: commit
    };
    console.log('new job', job);
    this.jobService.newJob({job: job, users: this.selectedUsers}, this.Team.id).subscribe(job =>
    {
      if (job) {
        console.log(job);
        this.jobService.addEvent.emit(job);
        this.bsModalRef.hide();
      }
    });
  }

  addUser ()
  {
    console.log(this.selectedUser);
    if (this.selectedUsers.find(x => x.displayName == this.selectedUser))
    {
      console.log('user already in list');
      return;
    }
    this.selectedUsers.push(this.Team.Affiliations.find(x => x.displayName == this.selectedUser));
    console.log(this.selectedUsers);
  }

  filterUsers (Affiliations: User[])
  {
    return Affiliations.filter(x => !this.selectedUsers.includes(x));
  }
}
