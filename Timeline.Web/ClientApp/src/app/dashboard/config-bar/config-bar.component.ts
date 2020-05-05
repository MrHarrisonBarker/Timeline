import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-config-bar',
  templateUrl: './config-bar.component.html',
  styleUrls: ['./config-bar.component.css']
})
export class ConfigBarComponent implements OnInit
{

  open: boolean;
  currentActive: string = 'Board';

  constructor (private authService: AuthService)
  {
    this.authService.toggleConfigBar.subscribe(() =>
    {
      this.open = !this.open;
    });
  }

  ngOnInit (): void
  {
  }

  show (show: string)
  {
    this.authService.showConfig.emit(show);
    this.currentActive = show;
  }
}
