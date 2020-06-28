import {EventEmitter, Inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Job, JobPriority, JobStatus, JobType} from "../_models/job";
import {User} from "../_models/user";
import {Board} from "../_models/board";
import {WarehouseService} from "./warehouse.service";

export interface NewJob
{
  job: Job,
  users: User[]
}

export enum DEFCON
{
  DEFCON5 = "#4caf50",
  DEFCON4 = "#8bc34a",
  DEFCON3 = "#ffc107",
  DEFCON2 = "#ff9800",
  DEFCON1 = "#ff5722",
}

export interface JobRoute
{
  teamId: string;
  boardId: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService
{
  public addEvent: EventEmitter<Job> = new EventEmitter<Job>();
  public removeEvent: EventEmitter<string> = new EventEmitter<string>();
  public priorityChange: EventEmitter<{ jobId: string, priority: JobPriority }> = new EventEmitter<{ jobId: string, priority: JobPriority }>();
  private readonly baseUrl: string;

  private readonly header: HttpHeaders;

  constructor (private authService: AuthService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private warehouse: WarehouseService)
  {
    this.baseUrl = baseUrl;
    this.header = new HttpHeaders({'Authorization': `Bearer ${this.authService.User.token}`})
  }

  public newJob (newJob: NewJob, teamId: string, boardId: string): Observable<Job>
  {
    return this.http.post<Job>(this.baseUrl + 'api/job/Create', newJob, {
      headers: this.header,
      params: new HttpParams().set('UserId', this.authService.User.id).set('TeamId', teamId).set('BoardId', boardId)
    }).pipe(map(job =>
    {
      let indexes = this.warehouse.GetTeamBoardIndex(teamId,boardId);
      this.warehouse.Teams[indexes.team].jobs.push(job);
      this.warehouse.Teams[indexes.team].boards[indexes.board].jobs.push(job);
      console.log('pushed new job to warehouse', this.warehouse.Teams[this.warehouse.CurrentTeamIndex()]);
      this.warehouse.ChangeDetect.emit(null);
      return job;
    }));
  }

  public newBoardlessJob (newJob: NewJob, teamId: string): Observable<Job>
  {
    return this.http.post<Job>(this.baseUrl + 'api/job/CreateBoardlessJob', newJob, {
      headers: this.header,
      params: new HttpParams().set('UserId', this.authService.User.id).set('TeamId', teamId)
    }).pipe(map(job =>
    {
      this.warehouse.Teams[this.warehouse.CurrentTeamIndex()].jobs.push(job);
      return job;
    }));
  }

  public removeJob (job: Job): Observable<any>
  {
    return this.http.post(this.baseUrl + 'api/job/RemoveJob', "", {
      headers: this.header,
      params: new HttpParams().set('JobId', job.id)
    }).pipe(map((data) =>
    {
      return data;
    }))
  }

  public changeStatus (jobId: string, jobStatus: JobStatus)
  {
    return this.http.post(this.baseUrl + 'api/job/ChangeStatus', '', {
      headers: this.header,
      params: new HttpParams().set('JobId', jobId).set('JobStatus', JobStatus[jobStatus])
    })
  }

  public changePriority (jobId: string, jobPriority: JobPriority)
  {
    return this.http.post(this.baseUrl + 'api/job/ChangePriority', '', {
      headers: this.header,
      params: new HttpParams().set('JobId', jobId).set('Priority', JobPriority[jobPriority])
    })
  }

  public updateName (jobId: string, name: string): Observable<string>
  {
    return this.http.put<string>(this.baseUrl + 'api/job/UpdateName', {
      jobId: jobId,
      name: name
    }, {headers: this.header});
  }

  public updateDescription (jobId: string, description: string): Observable<string>
  {
    return this.http.put<string>(this.baseUrl + 'api/job/UpdateDescription', {
      jobId: jobId,
      description: description
    }, {headers: this.header});
  }

  public addWorker (userId: string, jobId: string): Observable<any>
  {
    return this.http.put(this.baseUrl + 'api/job/addworker', {userId: userId, jobId: jobId}, {headers: this.header});
  }

  public getRoute (jobId: string): Observable<JobRoute>
  {
    return this.http.get<JobRoute>(this.baseUrl + 'api/job/GoToJob', {
      headers: this.header,
      params: new HttpParams().set('JobId', jobId)
    });
  }

  updateArchived (checked: boolean, jobId: String): Observable<any>
  {
    return this.http.put(this.baseUrl + 'api/job/UpdateArchived', {
      jobId: jobId,
      archived: checked
    }, {headers: this.header});
  }

  public JobToStatus (job: Job)
  {
    return JobStatus[job.jobStatus];
  }

  public JobToType (job: Job)
  {
    return JobType[job.jobType];
  }

  public JobToPriority (job: Job)
  {
    return JobPriority[job.priority];
  }

  public GetBorderAccent (job: Job): string
  {
    switch (job.jobStatus)
    {
      // case JobStatus.Backlog:
      // {
      //   return "solid #f44336";
      // }
      case JobStatus.ToDo:
      {
        return "solid blue";
      }
      case JobStatus.Completed:
      {
        return "solid #4caf50";
      }
      case JobStatus.InProgress:
      {
        return "solid brown"
      }
      case JobStatus.Verify:
      {
        return "solid orange"
      }
    }
  }

  public getStatusBackGround (job: Job): string
  {
    switch (job.jobStatus)
    {
      // case JobStatus.Backlog:
      // {
      //   return "#f44336";
      // }
      case JobStatus.ToDo:
      {
        return "Blue";
      }
      case JobStatus.Completed:
      {
        return "#4caf50";
      }
      case JobStatus.InProgress:
      {
        return "brown";
      }
      case JobStatus.Verify:
      {
        return "orange"
      }
    }
  }


  public getPriorityBackGround (job: Job): DEFCON
  {
    switch (job.priority)
    {
      case JobPriority.DEFCON5:
        return DEFCON.DEFCON5;
      case JobPriority.DEFCON4:
        return DEFCON.DEFCON4;
      case JobPriority.DEFCON3:
        return DEFCON.DEFCON3;
      case JobPriority.DEFCON2:
        return DEFCON.DEFCON2;
      case JobPriority.DEFCON1:
        return DEFCON.DEFCON1;
    }
  }

  public getPriorityBorder (job: Job): string
  {
    switch (job.priority)
    {
      case JobPriority.DEFCON5:
        return 'solid ' + DEFCON.DEFCON5;
      case JobPriority.DEFCON4:
        return 'solid ' + DEFCON.DEFCON4;
      case JobPriority.DEFCON3:
        return 'solid ' + DEFCON.DEFCON3;
      case JobPriority.DEFCON2:
        return 'solid ' + DEFCON.DEFCON2;
      case JobPriority.DEFCON1:
        return 'solid ' + DEFCON.DEFCON1;
    }
  }

  public getTypeBackGround (job: Job): string
  {
    switch (job.jobType)
    {
      case JobType.Bug :
      {
        return "limegreen"
      }
      case JobType.Feature :
      {
        return "purple"
      }
      case JobType.Generic :
      {
        return "grey"
      }
    }
  }

  public getTypeBackGroundJob (type: JobType): string
  {
    switch (type)
    {
      case JobType.Bug :
      {
        return "limegreen"
      }
      case JobType.Feature :
      {
        return "purple"
      }
      case JobType.Generic :
      {
        return "grey"
      }
    }
  }


  public updateFlag (jobId: string): Observable<any>
  {
    return this.http.put(this.baseUrl + 'api/job/UpdateFlag', '', {
      headers: this.header,
      params: new HttpParams().set('JobId', jobId)
    });
  }
}
