import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Isloggedin!:boolean;
  constructor() { }
  authenticate(username:string,password:string){
    if(username=="Vishwas" && password=="zyNxx"){
      sessionStorage.setItem('authenticatedUser',username)
      this.Isloggedin=true;
      return true
    }
    else return false
  }
  isloggedin(){
    let user = sessionStorage.getItem('authenticaterUser')
    return (user === null)
  }
}
