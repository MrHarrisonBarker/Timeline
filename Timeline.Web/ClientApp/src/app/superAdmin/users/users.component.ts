import {Component, OnInit} from '@angular/core';
import {SuperService} from "../../_services/super.service";
import {User} from "../../_models/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit
{
  public Users: User[];
  displayedColumns: string[] = ['id','name','email','type','avatar'];

  constructor (private superService: SuperService)
  {
  }

  ngOnInit (): void
  {
    this.superService.getUsers().subscribe(users => this.Users = users);
  }

}
