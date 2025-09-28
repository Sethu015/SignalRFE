import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalrTest } from './signalr-test';
import { AuthService } from './auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit,OnDestroy {
  constructor(private signalRService:SignalrTest,private authService:AuthService) {

  }
  ngOnDestroy(): void {
    this.signalRService.hubConnection?.off('AskServerResponse');
  }
  ngOnInit(): void {
    this.signalRService.startConnection();

    setTimeout(() =>{
      this.signalRService.askServerListener();
      this.signalRService.askServer();
    },5000);
  }
  protected readonly title = signal('signalr-frontend');
}
