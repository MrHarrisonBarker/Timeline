import {Team} from "./team";
import {Job} from "./job";
import {Board} from "./board";

export enum UserType
{
  Regular,
  Admin,
  SuperAdmin
}

export interface User
{
  id?: string;
  displayName: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  password: string;
  token?: string;
  // type: UserType;

  employments?: Team[];
  boardMemberships?: Board[]
  assignments?: Job[];
}

export interface Authenticate {
  email: string;
  password: string;
}

