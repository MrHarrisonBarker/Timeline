import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../_services/team.service";
import {Job} from "../../_models/job";
import {JobService} from "../../_services/job.service";
import {WarehouseService} from "../../_services/warehouse.service";

@Component({
  selector: 'app-team-progress',
  templateUrl: './team-progress.component.html',
  styleUrls: ['./team-progress.component.css']
})
export class TeamProgressComponent implements OnInit
{

  yearInWeeks: Date[][] = [...Array(52)].map(e => Array(7));
  jobsStartedInYear: number[][] = [...Array(52).fill(0)].map(e => Array(7).fill(0));
  jobsFinishedInYear: number[][] = [...Array(52).fill(0)].map(e => Array(7).fill(0));
  jobsByProgress: Job[] = [];
  ready: boolean = false;
  dailyOffset = 0;

  constructor (public teamService: TeamService, public jobService: JobService, public warehouse: WarehouseService)
  {

  }

  ngOnInit (): void
  {
    // console.log('jobs started in year', this.jobsStartedInYear);
    this.generateYearInWeeks();
    this.generateJobsByProgress();
    this.warehouse.Teams[this.warehouse.CurrentTeamIndex()].jobs.forEach(job =>
    {
      let today = new Date();
      let startDate = new Date(job.startDate);

      if (startDate > new Date(0) && startDate > new Date(today.getFullYear() - 1, today.getMonth() + 1, today.getDate()) && startDate < today)
      {
        let numberOfDaysFrom = today.getTime() - startDate.getTime();
        // console.log('today', today, 'start', startDate, 'number of days from', numberOfDaysFrom / 86400000);
        let numberOfDaySpots = Math.round(numberOfDaysFrom / 86400000) + this.dailyOffset;
        let weeks = Math.floor(numberOfDaySpots / 7);
        let days = Math.round(numberOfDaySpots % 7);
        console.log('weeks from', weeks, 'days from', days);
        if (weeks >= 0 && days >= 0)
        {
          this.jobsStartedInYear[weeks][days]++;
        }
      }


      let endDate = new Date(job.endDate);
      if (endDate > new Date(0))
      {
        let endNumberOfDaysFrom = today.getTime() - endDate.getTime();
        let endNumberOfDaySpots = Math.round(endNumberOfDaysFrom / 86400000) + this.dailyOffset;
        let endWeeks = Math.floor(endNumberOfDaySpots / 7);
        let endDays = Math.round(endNumberOfDaySpots % 7);
        if (endWeeks >= 0 && endDays >= 0)
        {
          this.jobsFinishedInYear[endWeeks][endDays]++;
        }
      }
    });

    for (let week = 0; week < 52; week++)
    {
      this.jobsStartedInYear[week] = this.jobsStartedInYear[week].reverse();
      this.jobsFinishedInYear[week] = this.jobsFinishedInYear[week].reverse();
    }
    this.jobsStartedInYear = this.jobsStartedInYear.reverse();
    this.jobsFinishedInYear = this.jobsFinishedInYear.reverse();

  }

  private generateJobsByProgress ()
  {
    this.jobsByProgress = this.warehouse.Teams[this.warehouse.CurrentTeamIndex()].jobs.sort((a, b) =>
    {
      if (a.jobStatus < b.jobStatus)
      {
        return -1;
      } else
      {
        return 1;
      }
    });
  }

  private generateYearInWeeks (): void
  {
    let today = new Date();

    for (let week = 0; week < 52; week++)
    {
      for (let day = 0; day < 7; day++)
      {
        if (week == 0 && day < today.getDay() - 1)
        {
          this.yearInWeeks[week][day] = null;
          this.dailyOffset++;
        } else
        {
          let numberOfDays = ((week) * 7) + day - this.dailyOffset;
          this.yearInWeeks[week][day] = new Date(today.getTime() - (numberOfDays * 86400000))
        }

      }
    }
    // console.log('year in weeks full?', this.yearInWeeks);

    for (let week = 0; week < 52; week++)
    {
      this.yearInWeeks[week] = this.yearInWeeks[week].reverse();
    }
    this.yearInWeeks = this.yearInWeeks.reverse();
  }

  jobsStartedBackground (n: number): string
  {
    if (n == 0)
    {
      return '#ebedf0';
    }
    if (n < 2)
    {
      return '#f9fbe7';
    }
    if (n < 5)
    {
      return '#dce775';
    }
    if (n < 7)
    {
      return '#cddc39';
    }
    if (n => 7)
    {
      return '#827717';
    }
  }

  jobsFinishedBackground (n: number): string
  {
    if (n == 0)
    {
      return '#ebedf0';
    }
    if (n < 2)
    {
      return '#ffcdd2';
    }
    if (n < 5)
    {
      return '#e57373';
    }
    if (n < 7)
    {
      return '#e53935';
    }
    if (n => 7)
    {
      return '#b71c1c';
    }
  }
}
