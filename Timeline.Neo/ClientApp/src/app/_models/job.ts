import {User} from "./user";
import {Board} from "./board";
import {Team} from "./team";

export enum JobStatus {
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
  id?: string;
  createdBy?: User;
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  deadline?: Date;
  finished?: boolean;
  archived?: boolean;


  jobStatus?: JobStatus | number;
  jobType?: JobType | number;
  associatedUrl?: string;
  commit?: string;
  pings?: number;
  flagged?: boolean;
  priority?: JobPriority | number;

  board?: Board;
  team?:Team;
  assignedMembers?: User[] | string[];
}

export class Deadline
{
  Deadline: Date;
  Jobs: Job[];
}
