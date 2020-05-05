import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../_services/team.service";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(public teamService: TeamService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  updateName ()
  {

  }
}
