import { Component, OnInit } from '@angular/core';
import { SignalrTest, User } from '../signalr-test';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home implements OnInit {

  constructor(public signalRService:SignalrTest) { }
  ngOnInit(): void {
    this.userOnLis();
    this.userOffLis();
    this.logOutLis();
    this.getOnlineUsersLis();

    if(this.signalRService.hubConnection?.state == 1) this.usersOnline();
    else{
      this.signalRService.ssObs().subscribe((obj:any)=>{
        if(obj.name === 'HubConnectionStarted'){
          this.usersOnline();
        }
      });
    }
  }
  users:Array<User> = [];

  logout(){
    this.signalRService.hubConnection?.invoke('LogOut',this.signalRService.userData?.id)
    .catch(err=>console.error(err))
  }

  logOutLis(){
    this.signalRService.hubConnection?.on('LogOutResponse',() =>{
      localStorage.removeItem('personId');
      location.reload();
    });
  }

  userOnLis(){
    this.signalRService.hubConnection?.on('UserOn',(user:User) =>{
      this.users.push(user);
    });

  }

  userOffLis(){
    this.signalRService.hubConnection?.on('UserOff',(personId:string) =>{
      this.users = this.users.filter(u => u.id != personId);
    });
  }

  usersOnline(){
    this.signalRService.hubConnection?.invoke('GetOnlineUsers')
    .catch(err=>console.error(err));
  }

  getOnlineUsersLis(){
    this.signalRService.hubConnection?.on('GetOnlineUsersResponse',(users:Array<User>) =>{
      this.users = users;
    });
  }

}
