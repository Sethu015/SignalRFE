import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SignalrTest {

  constructor(private toastr:ToastrService) { }

  hubConnection: signalR.HubConnection | undefined;

  startConnection = () =>{
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7082/toastr',{
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();

    this.hubConnection.start().then(()=>{
      console.log('Connection started');
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
