import {User} from "./user";
import {Job} from "./job";

export interface Team {
  id?: string;
  name: string;
  owner?: User;
  avatarUrl: string;
  Affiliations?: User[];
  Associations?: Job[];
  inviteToken?: string;
}
