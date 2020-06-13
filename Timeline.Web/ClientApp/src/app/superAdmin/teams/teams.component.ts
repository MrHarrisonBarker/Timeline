import {Component, OnInit} from '@angular/core';
import {SuperService} from "../../_services/super.service";
import {Team} from "../../_models/team";
import {Board} from "../../_models/board";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeamsComponent implements OnInit
{

  public Teams: Team[];
  public displayedColumns: string[] = ['id','name','description','owner','image'];
  expandedElement: Board | null;

  constructor (private superService: SuperService)
  {
  }

  ngOnInit (): void
  {
    this.superService.getTeams().subscribe(teams => this.Teams = teams);
  }

}
