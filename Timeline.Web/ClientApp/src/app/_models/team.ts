import {User} from "./user";
import {Board} from "./board";
import {Job} from "./job";

export interface Team
{
  id?: string;
  name: string;
  owner?: User;
  avatarUrl: string;
  TeamMembers?: User[];
  Boards?: Board[];
  Jobs?: Job[];
  inviteToken?: string;
  description?: string;
  accent?: string;
}
