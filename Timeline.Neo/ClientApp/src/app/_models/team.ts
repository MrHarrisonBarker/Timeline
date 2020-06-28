import {User} from "./user";
import {Board} from "./board";
import {Job} from "./job";

export interface Team
{
  id?: string;
  name: string;
  owner?: User;
  avatar: string;
  inviteToken?: string;
  description?: string;
  accent?: string;


  employments?: User[];
  boards?: Board[];
  jobs?: Job[];

}
