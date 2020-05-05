import {User} from "./user";

export enum JobStatus {
  Backlog,
  ToDo,
  InProgress,
  Verify,
  Completed
}

export enum JobType {
  Bug,
  Feature,
  Generic
}

export enum JobPriority {
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
}

export interface Job {
  jobId?: string;
  createdBy?: User;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  deadline?: Date;
  finished: boolean;
  archived: boolean;
  AssociatedUsers?: User[] | string[];

  jobStatus?: JobStatus | number;
  jobType?: JobType | number;
  associatedUrl?: string;
  commit?: string;
  pings?: number;
  flagged?: boolean;
  priority?: JobPriority | number;
}

export class Deadline
{
  Deadline: Date;
  Jobs: Job[];
}
