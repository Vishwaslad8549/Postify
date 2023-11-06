import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  authenticate(username:string,password:string){
    if(username=="Vishwas" && password=="zyNxx"){
      console.log("Authenticated")
      return true
    }
    else return false
  }
}
