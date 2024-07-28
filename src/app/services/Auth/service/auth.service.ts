import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../../../models/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
const url=environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserAuthenticated = new Subject<boolean>
  private token:string;
  private isauthenticated:boolean;
  constructor(private http:HttpClient ,private router:Router) { }
  createUser(email:string,password:string){
    const AuthData:AuthData={email:email,password:password}
    this.http.post(url+"user/signup",AuthData)
    .subscribe(res=>{
      console.log(res)
    })
  }
  getToken(){
    return this.token;
  }  
  isAuth(){
    return this.isauthenticated;
  }
  getUserAuthenticated(){
    return this.isUserAuthenticated.asObservable()
  }
  loginUser(email:string,password:string){
    const AuthData:AuthData={email:email,password:password}
    this.http.post<{token:string}>(url+"user/login",AuthData)
    .subscribe((response)=>{
      console.log(response)
      const token= response.token
      this.token=token
      if(token){
        this.isauthenticated=true;
        this.isUserAuthenticated.next(true)
      this.router.navigate(['home'])
      }
      
    })
  }
  logout(){
        this.token=null
        this.isauthenticated=false;
        this.isUserAuthenticated.next(false)
  }
  // authenticate(username:string,password:string){
  //   if(username=="Vishwas" && password=="zyNxx"){
  //     sessionStorage.setItem('authenticatedUser',username)
  //     this.Isloggedin=true;
  //     return true
  //   }
  //   else return false
  // }
  // isloggedin(){
  //   let user = sessionStorage.getItem('authenticaterUser')
  //   return (user === null)
  // }
  get jsondata(){
    return (this.http.get("https://jsonplaceholder.typicode.com/posts"))
  }
}
