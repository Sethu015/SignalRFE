import { Injectable } from '@angular/core';
import { SignalrTest } from './signalr-test';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean = false;

  constructor(public signalRService:SignalrTest) { 
    let tempPersonId = localStorage.getItem('personId');
    if(tempPersonId){
      if(this.signalRService.hubConnection?.state == 1){
        this.reAuthMeListenerSuccess();
        this.reAuthMeListenerFail();
        this.reAuthMe(tempPersonId);
      }
      else{
        this.signalRService.ssObs().subscribe((obj:any)=>{
          if(obj.name === 'HubConnectionStarted'){
            this.reAuthMeListenerSuccess();
            this.reAuthMeListenerFail();
            this.reAuthMe(tempPersonId);
          }
        });
      }
    }
  }

  public authMeListenerFail() {
    this.signalRService.hubConnection?.on('AuthMeResponseFail',() =>{
      this.signalRService.toastr.error('Login failed');
    });
  }

  public authMeListenerSuccess() {
    this.signalRService.hubConnection?.on('AuthMeResponseSuccess',(person:any) =>{
      this.signalRService.personName = person.userName;
      this.isAuthenticated = true;
      localStorage.setItem('personId',person.id);
      this.signalRService.toastr.success('Login successfull. Welcome '+this.signalRService.personName);
      this.signalRService.router.navigate(['/home']);
    });
  }

  public async authMe(userName:string,password:string){
    let personInfo = {
      userName: userName,
      password: password};

    await this.signalRService.hubConnection?.invoke('AuthMe',personInfo)
    .catch(err=>console.error(err))
      .finally(() => this.signalRService.toastr.info('AuthMe invoked'));
  }

  public async reAuthMe(personId:string){
    this.signalRService.hubConnection?.invoke('ReAuthMe',personId)
    .then(() => this.signalRService.toastr.info('ReAuthMe invoked'))
    .catch(err=>console.error(err));
  }

  public reAuthMeListenerSuccess(){
    this.signalRService.hubConnection?.on('ReAuthMeResponseSuccess',(person:any) =>{
      this.signalRService.personName = person.userName;
      this.isAuthenticated = true;
      localStorage.setItem('personId',person.id);
      this.signalRService.toastr.success('ReAuth successfull. Welcome back '+this.signalRService.personName);
      if(this.signalRService.router.url === '/auth')
        this.signalRService.router.navigate(['/home']);
    });
  }

  public reAuthMeListenerFail(){
    this.signalRService.hubConnection?.on('ReAuthMeResponseFail',() =>{
      this.signalRService.toastr.error('ReAuth failed');
    });
  }

}
