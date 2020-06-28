import {Component, OnInit} from '@angular/core';
import {WarehouseService} from "../../../_services/warehouse.service";
import {Board, MinimalBoard} from "../../../_models/board";

interface RoadMap
{
  Date: Date,
  isAllNull: boolean,
  Boards?: OrderedBoard[]
}

interface OrderedBoard
{
  Order: number;
  Board?: MinimalBoard;
}


@Component({
  selector: 'app-road-map',
  templateUrl: './road-map.component.html',
  styleUrls: ['./road-map.component.css']
})
export class RoadMapComponent implements OnInit
{

  public Road: RoadMap[] = [];
  maxOrder: number;

  constructor (private warehouse: WarehouseService)
  {
  }

  ngOnInit (): void
  {
    // this.maxOrder = this.warehouse.Teams[this.warehouse.CurrentTeamIndex()].boards.length;
    this.createRoad();
  }

  createRoad ()
  {
    let today = new Date();
    let month = today.getUTCMonth();
    let startDate = new Date(today.getUTCFullYear() - 1, month, 1);
    let endDate = new Date(today.getUTCFullYear() + 1, month, 1);
    let numberOfDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    let currentDate = new Date();
    console.log('start date', startDate, 'end date', endDate);
    console.log('number of days', numberOfDays);
    for (let i = 0; i < numberOfDays; i++)
    {
      currentDate = new Date(startDate.getTime() + (i * 86400000));
      this.Road.push({Date: currentDate, Boards: [],isAllNull: false});
    }
    console.log('road', this.Road);
    this.populateRoad();
  }

  populateRoad ()
  {
    for (let i = 0; i < this.Road.length; i++)
    {
      let order: number = 0;
      this.warehouse.Teams[this.warehouse.CurrentTeamIndex()].boards.forEach(board =>
      {
        let startDate = new Date(board.startDate);
        let endDate = new Date(board.endDate);

        if (this.Road[i].Date.getFullYear() == startDate.getFullYear() && this.Road[i].Date.getMonth() == startDate.getMonth() && this.Road[i].Date.getDate() == startDate.getDate())
        {
          console.log('pushing board start', this.Road[i]);

          let numberOfDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
          for (let day = 0; day < numberOfDays; day++)
          {
            this.Road[i + day].Boards.push({
              Board: {
                accent: board.accent,
                endDate: board.endDate,
                startDate: board.startDate,
                finished: board.finished,
                id: board.id,
                name: board.name
              }, Order: order
            });
          }
        } else
        {
          if (this.Road[i].Boards.filter(x => x.Board?.id == board?.id).length < 1)
          {
            this.Road[i].Boards.push({Order: order});
          }
        }

        order++;
      });
      this.maxOrder = order;
      if (this.Road[i].Boards.filter(x => x.Board == null).length == this.maxOrder) {
        this.Road[i].isAllNull = true;
      }
    }

    for (let i = 0; i < this.Road.length; i++)
    {
      this.Road[i].Boards.sort((a, b) =>
      {
        if (a.Order < b.Order)
        {
          return -1;
        }
        if (a.Order > b.Order)
        {
          return 1;
        }
        return 0;
      })
    }

    console.log('populated road', this.Road);
  }

}
