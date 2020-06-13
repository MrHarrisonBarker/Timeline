import {Team} from "./team";
import {Job} from "./job";

export enum UserType
{
  Regular,
  Admin,
  SuperAdmin
}

export interface User {
  id?: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  password: string;
  token?: string;
  Affiliations?: Team[];
  Associations?: Job[];
  type: UserType;
}

export interface Authenticate {
  email: string;
  password: string;
}

