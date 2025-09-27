import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SignalrTest } from '../signalr-test';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnInit,OnDestroy {


  constructor(private signalRService:SignalrTest) { }
  ngOnDestroy(): void {
    this.signalRService.hubConnection?.off('AuthMeResponseSuccess');
    this.signalRService.hubConnection?.off('AuthMeResponseFail');
  }

  ngOnInit(): void {
    this.authMeListenerSuccess();
    this.authMeListenerFail();
  }
  authMeListenerFail() {
    this.signalRService.hubConnection?.on('AuthMeResponseFail',() =>{
      this.signalRService.toastr.error('Login failed');
    });
  }
  authMeListenerSuccess() {
    this.signalRService.hubConnection?.on('AuthMeResponseSuccess',(person:any) =>{
      this.signalRService.personName = person.userName;
      this.signalRService.toastr.success('Login successfull. Welcome '+this.signalRService.personName);
      this.signalRService.router.navigate(['/home']);
    });
  }

  onSubmit(authForm:NgForm){
    if(!authForm.valid)
      return;

    this.authMe(authForm.value.userName,authForm.value.password);
    authForm.reset();
  }

  private async authMe(userName:string,password:string){
    let personInfo = {
      userName: userName,
      password: password};

    await this.signalRService.hubConnection?.invoke('AuthMe',personInfo)
    .catch(err=>console.error(err))
      .finally(() => this.signalRService.toastr.info('AuthMe invoked'));
  }

}
