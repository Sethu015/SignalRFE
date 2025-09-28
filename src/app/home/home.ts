import { Component } from '@angular/core';
import { SignalrTest } from '../signalr-test';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {

  constructor(public signalRService:SignalrTest) { }

}
