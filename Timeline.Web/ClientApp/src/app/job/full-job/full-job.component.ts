import {Component, Inject, Input, OnInit} from '@angular/core';
import {JobService} from "../../_services/job.service";
import {Job} from "../../_models/job";
import {User} from "../../_models/user";
import {BoardService} from "../../_services/board.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-full-job',
  templateUrl: './full-job.component.html',
  styleUrls: ['./full-job.component.css']
})
export class FullJobComponent implements OnInit
{

  Job: Job;
  public selectedUser: string;
  private selectedUsers: User[] = [];

  constructor (public jobService: JobService, private boardService: BoardService, @Inject(MAT_DIALOG_DATA) public data: any)
  {
  }

  ngOnInit ()
  {
    this.Job = this.data.job;
  }


  GetCommit ()
  {
    if (this.Job.commit)
    {
      return new URL(this.Job.commit).pathname.split('/')[4];
    }
    return null;
  }

  updateName (jobId: string, name: string)
  {
    if (this.Job.name != name)
    {
      this.jobService.updateName(jobId, name).subscribe(() =>
      {
        console.log('Updated name');
        this.Job.name = name
      });
    }
  }

  updateDescription (jobId: string, description: string)
  {
    if (this.Job.description != description)
    {
      this.jobService.updateDescription(jobId, description).subscribe(() =>
      {
        console.log('Updated description');
        this.Job.description = description;
      });
    }
  }

  removeJob ()
  {
    this.jobService.removeJob(this.Job.jobId).subscribe(() =>
    {
      console.log("Removed job", this.Job.jobId);
      this.jobService.removeEvent.emit(this.Job.jobId);
    });
    ;
  }

  changePriority (jobPriority: number)
  {
    this.jobService.changePriority(this.Job.jobId, jobPriority).subscribe(() =>
    {
      this.Job.priority = jobPriority;
      this.jobService.priorityChange.emit({jobId: this.Job.jobId, priority: jobPriority});
      console.log("Changed priority");
    });
  }

  toggleFlag ()
  {

  }

  addUser ()
  {
    console.log(this.boardService.board.BoardMembers);
    // @ts-ignore
    if (this.Job.AssociatedUsers.find(x => x.displayName == this.selectedUser))
    {
      console.log('user already in list');
      return;
    }
    console.log('associated', this.Job.AssociatedUsers);
    let user = this.boardService.board.BoardMembers.find(x => x.displayName == this.selectedUser);
    this.jobService.addWorker(user.id, this.Job.jobId).subscribe(() =>
    {
      // @ts-ignore
      this.Job.AssociatedUsers.push(user);
      console.log(this.Job.AssociatedUsers);
    });
  }

  filterUsers (Affiliations: User[])
  {
    // @ts-ignore
    return Affiliations.filter(x => !this.Job.AssociatedUsers.includes(x));
  }

  updateArchived (checked: boolean)
  {
    // if (checked != this.Job.archived)
    // {
    //   this.jobService.updateArchived(checked, this.Job.jobId).subscribe(() =>
    //   {
    //     console.log('finished archived update');
    //     this.Job.archived = checked;
    //     this.bsModalRef.hide();
    //   });
    // }
  }

  flagJob ()
  {
    this.jobService.updateFlag(this.Job.jobId).subscribe(flag => {
      console.log('updated flag',flag);
      this.Job.flagged = !this.Job.flagged;
    });
  }
}
