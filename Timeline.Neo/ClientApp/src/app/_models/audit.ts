import {User} from "./user";
import {Team} from "./team";

enum AuditAction
{
}

enum AuditOrigin
{
}

export interface Audit {
  id?: string;
  timeStamp: Date;
  action: AuditAction;
  log: string;
  origin: AuditOrigin;
  user: User;
  team: Team;
}
