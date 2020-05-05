import {Component, Input, OnInit} from '@angular/core';
import {User} from "../_models/user";
import {SocketService} from "../_services/socket.service";

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit
{

  @Input() onlineIndicate: boolean;
  @Input() user: User;
  @Input() size: number = 40;
  public Online: boolean;

  constructor (private socketService: SocketService)
  {
    // if (this.onlineIndicate)
    // {
      this.socketService.updateOnlineUsers.subscribe(() =>
      {
        this.isOnline();
      });
    // }
  }

  ngOnInit ()
  {
    this.isOnline();
  }

  isOnline ()
  {
    this.Online = this.socketService.onlineUsers.filter(x => x.userId == this.user.id).length > 0;
  }
}
