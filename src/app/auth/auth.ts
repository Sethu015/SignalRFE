import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SignalrTest } from '../signalr-test';
import { AuthService } from '../auth';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnInit,OnDestroy {


  constructor(private signalRService:SignalrTest,private authService:AuthService) { }
  ngOnDestroy(): void {
    this.signalRService.hubConnection?.off('AuthMeResponseSuccess');
    this.signalRService.hubConnection?.off('AuthMeResponseFail');
  }

  ngOnInit(): void {
    this.authService.authMeListenerSuccess();
    this.authService.authMeListenerFail();
  }

  onSubmit(authForm:NgForm){
    if(!authForm.valid)
      return;

    this.authService.authMe(authForm.value.userName,authForm.value.password);
    authForm.reset();
  }

}
