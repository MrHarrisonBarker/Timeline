import {User} from "./user";
import {Job} from "./job";

export interface Board
{
  id?: string;
  name: string;
  owner?: User;
  avatarUrl: string;
  inviteToken?: string;
  description?: string;
  accent?: string;

  BoardMembers?: User[];
  Jobs?: Job[];
}
