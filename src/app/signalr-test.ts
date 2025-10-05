import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@aspnet/signalr'
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';


export interface User{
  id:string;
  name : string;
  connId:string;
}

@Injectable({
  providedIn: 'root'
})

export class SignalrTest {

  constructor(public toastr:ToastrService,public router:Router) { }

  hubConnection: signalR.HubConnection | undefined;
  userData:User | undefined;
  ssSub = new Subject<any>();
  ssObs():Observable<any>{
    return this.ssSub.asObservable();
  }

  startConnection = () =>{
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7082/toastr',{
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();

    this.hubConnection.start().then(()=>{
      console.log('Connection started');
      this.ssSub.next({name:'HubConnectionStarted'});
    }).catch(err=>console.log('Error while starting connection: '+err))
  }

  async askServer() {
    await this.hubConnection?.invoke('AskServer','hey')
    .catch(err=>console.error(err));
  }

  askServerListener () {
    this.hubConnection?.on('AskServerResponse',(texts)=>{
      this.toastr.success(texts);
    });
  }

}
