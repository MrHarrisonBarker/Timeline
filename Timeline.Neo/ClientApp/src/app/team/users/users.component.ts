import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../_services/team.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public teamService: TeamService) { }

  ngOnInit(): void {
  }

}
