import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Isloggedin!:boolean;
  constructor() { }
  authenticate(username:string,password:string){
    if(username=="Vishwas" && password=="zyNxx"){
      this.Isloggedin=true
      return true
    }
    else return false
  }
  isloggedin(){
    return this.Isloggedin;
  }
}
