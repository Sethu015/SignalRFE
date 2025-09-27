import { Component } from '@angular/core';
import { SignalrTest } from '../signalr-test';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(public signalRService:SignalrTest) { }

}
