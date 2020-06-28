import {EventEmitter, Injectable} from '@angular/core';
import {Board} from "../_models/board";
import {Job} from "../_models/job";
import {Team} from "../_models/team";

export interface Indexes
{
  team: number,
  board: number
}


@Injectable({
  providedIn: 'root'
})
export class WarehouseService
{

  // public Boards: Board[] = [];
  public Jobs: Job[] = [];
  public Teams: Team[] = [];
  public CurrentTeamId: string;
  public ChangeDetect: EventEmitter<any> = new EventEmitter<any>();

  constructor ()
  {
  }

  public CurrentTeamIndex (): number
  {
    return this.Teams.findIndex(x => x.id == this.CurrentTeamId);
  }

  public GetTeamBoardIndex (TeamId: string, BoardId: string): Indexes
    {
      let teamIndex = this.Teams.findIndex (x => x.id == TeamId);
      let boardIndex = this.Teams[teamIndex].boards.findIndex (x => x.id == BoardId);
      return {
      team: teamIndex, board: boardIndex
    };
}
}
