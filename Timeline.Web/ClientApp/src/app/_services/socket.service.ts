import {EventEmitter, Inject, Injectable} from '@angular/core';
import {HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {AuthService} from "./auth.service";

interface OnlineUser
{
  userId: string,
  connectionId: string
}

@Injectable({
  providedIn: 'root'
})
export class SocketService
{

  updateOnlineUsers: EventEmitter<any> = new EventEmitter();
  onlineUsers: OnlineUser[] = [];
  private readonly baseUrl: string;

  constructor (@Inject('BASE_URL') baseUrl: string)
  {
    console.log('socket construct');
    this.baseUrl = baseUrl;
  }

  connection: HubConnection;

  public createConnection (): Promise<void>
  {
    this.connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(this.baseUrl + 'hub/user', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    this.connection.on("new", (users: OnlineUser[]) =>
    {
      console.log('new', users);
      this.onlineUsers = users;
      this.updateOnlineUsers.emit();
    });

    this.connection.on("disconnect", users =>
    {
      console.log('disconnect', users);
      this.onlineUsers = users;
      this.updateOnlineUsers.emit();
    });

    return this.connection.start()
  }
}
