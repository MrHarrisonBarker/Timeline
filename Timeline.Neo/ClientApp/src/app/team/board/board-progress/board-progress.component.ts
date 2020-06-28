import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Indexes, WarehouseService} from "../../../_services/warehouse.service";

interface series
{
  name: string | any;
  value: any;
}

interface set
{
  name: string | any;
  series: series[];
}

@Component({
  selector: 'app-board-progress',
  templateUrl: './board-progress.component.html',
  styleUrls: ['./board-progress.component.css']
})
export class BoardProgressComponent implements OnInit
{

  TeamId: string;
  BoardId: string;
  Indexes: Indexes;

  statusMap: series[] = [{name: 'ToDo', value: 0}, {name: 'InProgress', value: 0}, {
    name: 'Verify',
    value: 0
  }, {name: 'Completed', value: 0}];
  typeMap: series[] = [{name: 'Bug', value: 0}, {name: 'Feature', value: 0}, {name: 'Generic', value: 0}];
  priorityMap: series[] = [{name: 'DEFCON 5', value: 0}, {name: 'DEFCON 4', value: 0}, {
    name: 'DEFCON 3',
    value: 0
  }, {name: 'DEFCON 2', value: 0}, {name: 'DEFCON 1', value: 0}];

  data: set[] = [{
    name: 'Raw Data',
    series: []
  }, {
    name: 'Regression estimate',
    series: []
  }];
  dailyProductivity: set[] = [];

  dailyTypeColorScheme = {
    domain: ['limegreen', 'purple', '#grey']
  };

  statusMapColourScheme = {
    domain: ['Blue', '#4caf50', 'brown', 'orange']
  };
  priorityMapColourScheme = {
    domain: ['#4caf50', '#8bc34a', '#ffc107', '#ff9800', '#ff5722']
  };

  constructor (private route: ActivatedRoute, private warehouse: WarehouseService)
  {
    this.TeamId = this.route.snapshot.paramMap.get('teamId');
    this.BoardId = this.route.snapshot.paramMap.get('boardId');
  }

  ngOnInit (): void
  {
    this.Indexes = this.warehouse.GetTeamBoardIndex(this.TeamId, this.BoardId);

    this.createSeries();
    this.createDailySeries();
    this.createStatusMap();
    this.createTypeMap();
    this.createPriorityMap();

    // this.warehouse.Teams[this.Indexes.team].boards[this.Indexes.board].jobs.forEach(job =>
    // {
    //   if (new Date(job.endDate) > new Date(null))
    //   {
    //     this.data[0].series.push({name: job.name, value: job.endDate});
    //   }
    // });

    // console.log(this.linearRegression([4, 3, 3, 2], [1, 2, 3, 4]));
  }

  createStatusMap ()
  {
    this.warehouse.Teams[this.Indexes.team].boards[this.Indexes.board].jobs.forEach(job =>
    {
      this.statusMap[job.jobStatus].value++;
    });
  }

  createTypeMap ()
  {
    this.warehouse.Teams[this.Indexes.team].boards[this.Indexes.board].jobs.forEach(job =>
    {
      this.typeMap[job.jobType].value++;
    });
  }

  createPriorityMap ()
  {
    this.warehouse.Teams[this.Indexes.team].boards[this.Indexes.board].jobs.forEach(job =>
    {
      this.priorityMap[job.jobStatus].value++;
    });
  }

  createDailySeries ()
  {
    let today = new Date;
    let start = new Date(this.warehouse.Teams[this.Indexes.team].boards[this.Indexes.board].startDate);
    let numberOfDays = (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    let currentDate = new Date();
    for (let i = 0; i < numberOfDays; i++)
    {
      currentDate = new Date(start.getTime() + (i * 86400000));
      this.dailyProductivity.push({
        name: currentDate.toDateString(),
        series: [{name: 'Bug', value: 0}, {name: 'Feature', value: 0}, {name: 'Generic', value: 0}]
      });

      this.warehouse.Teams[this.Indexes.team].boards[this.Indexes.board].jobs.forEach(job =>
      {
        let endDate = new Date(job.endDate);
        if (endDate > new Date(null))
        {
          if (currentDate.getFullYear() == endDate.getFullYear() && currentDate.getMonth() == endDate.getMonth() && currentDate.getDate() == endDate.getDate())
          {
            this.dailyProductivity[i].series[job.jobType].value++;
          }
        }
      });
    }
    console.log(this.dailyProductivity);
  }

  createSeries ()
  {
    let today = new Date;
    let start = new Date(this.warehouse.Teams[this.Indexes.team].boards[this.Indexes.board].startDate);
    let end = new Date(this.warehouse.Teams[this.Indexes.team].boards[this.Indexes.board].endDate);
    let numberOfDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    let currentDate = new Date();
    for (let i = 0; i <= numberOfDays; i++)
    {
      currentDate = new Date(start.getTime() + (i * 86400000));
      this.data[0].series.push({name: currentDate, value: 0});
      this.data[1].series.push({name: currentDate, value: 0});
    }

    let numberOfUnfinishedJobs = this.warehouse.Teams[this.Indexes.team].boards[this.Indexes.board].jobs.length;
    for (let i = 0; i < this.data[0].series.length; i++)
    {
      this.data[0].series[i].value = numberOfUnfinishedJobs;
      this.warehouse.Teams[this.Indexes.team].boards[this.Indexes.board].jobs.forEach(job =>
      {
        let endDate = new Date(job.endDate);
        if (endDate > new Date(null))
        {
          // console.log('date is not null');
          let seriesDate = new Date(this.data[0].series[i].name);
          if (seriesDate.getFullYear() == endDate.getFullYear() && seriesDate.getMonth() == endDate.getMonth() && seriesDate.getDate() == endDate.getDate())
          {
            // console.log('end date equals series date');
            this.data[0].series[i].value--;
            numberOfUnfinishedJobs--;
          }
        }
      });
      // if (this.data[0].series[i].value == numberOfUnfinishedJobs) {
      //   this.
      // }
    }

    console.log('raw data', this.data);

    let numberOfDaysUntilToday = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    let x: number[] = [];
    let y: number[] = [];
    for (let i = 0; i < numberOfDaysUntilToday; i++)
    {
      x.push(i);
      y.push(this.data[0].series[i].value);
    }

    console.log(x, y);
    let regression = this.linearRegression(y, x);

    for (let i = 0; i < this.data[0].series.length; i++)
    {
      if (i > numberOfDaysUntilToday + 1)
      {
        this.data[1].series[i].value = Math.floor(regression.intercept + (regression.slope * i));
      } else
      {
        this.data[1].series[i].value = this.data[0].series[i].value;
      }
    }

    console.log('estimated data', this.data);

  }

  linearRegression (y, x): { slope: number, intercept: number, r2: number }
  {
    let lr: { slope: number, intercept: number, r2: number } = {slope: 0, r2: 0, intercept: 0};
    let n = y.length;
    let sum_x = 0;
    let sum_y = 0;
    let sum_xy = 0;
    let sum_xx = 0;
    let sum_yy = 0;

    for (let i = 0; i < y.length; i++)
    {

      sum_x += x[i];
      sum_y += y[i];
      sum_xy += (x[i] * y[i]);
      sum_xx += (x[i] * x[i]);
      sum_yy += (y[i] * y[i]);
    }

    lr.slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    lr.intercept = (sum_y - lr.slope * sum_x) / n;
    lr.r2 = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);

    return lr;
  }

}
