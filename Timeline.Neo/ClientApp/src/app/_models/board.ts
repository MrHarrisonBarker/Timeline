import {User} from "./user";
import {Job} from "./job";
import {Team} from "./team";

export interface Board
{
  id?: string;
  name: string;
  avatar?: string;
  inviteToken?: string;
  description?: string;
  accent?: string;
  finished?: boolean;
  permanent?: boolean;

  startDate?: Date;
  endDate?: Date;

  boardMembers?: User[];
  team?: Team;
  jobs?: Job[];
}

export interface MinimalBoard
{
  id?: string;
  name: string;
  accent?: string;
  finished: boolean;
  startDate?: Date;
  endDate?: Date;
}
