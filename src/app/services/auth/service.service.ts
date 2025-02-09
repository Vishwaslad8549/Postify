import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../../../app/models/auth';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'

const url=environment.apiUrl;
//const url="http://localhost:3000/api/"
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public authStatusListener = new Subject<boolean>
  public userId:string;
  private token!: string;
  public isauthenticated!: boolean;
  private tokenTimer: any;
  public userName:string;
  constructor(private http:HttpClient ,private router:Router) { }
  createUser(email:string,password:string,userName:string){
    const AuthData:AuthData={email:email,password:password,userName:userName}
    this.http.post(url+"user/signup",AuthData)
    .subscribe(res=>{
      console.log(res)
    })
  }
  getToken(){
    return this.token;
  }  
  setToken(token){
    this.token=token;
  }
  isAuth(){
    return this.isauthenticated;
  }
  setisAuth(isauthenticated){
    this.isauthenticated=isauthenticated
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable()
  }
  loginUser(email:string,password:string){
      const AuthData:AuthData={email:email,password:password}
      this.http.post<{token:string,expiresIn:number,userId:string,userName:string}>(
        url+"user/login",AuthData).pipe(
          catchError(error=>{
            //console.log(error)
            return this.handleError(error);
          })
        ).subscribe(response=>{
          console.log('Login successful', response);
        if(response.token){
          this.setisAuth(true);
          this.setToken(response.token);
          const expiresInDuration=response.expiresIn
          this.authStatusListener.next(true)
          this.isauthenticated=true;
          this.userId=response.userId;
          this.userName=response.userName;
          console.log(this.userName)
          this.setAuthTimer(expiresInDuration);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          //console.log(expirationDate);
          this.saveAuthData(this.token, expirationDate,this.userId);
          this.router.navigate(["home"]);
          
        }
        })
    }
  
    private handleError(error: HttpErrorResponse) {
      if (error.status === 401) {
        // Unauthorized error
        return throwError(() => new Error('Invalid username or password.'));
      } else {
        // Other errors
        return throwError(() => new Error('Something went wrong. Please try again later.'));
      }
    }
  logout(){
        this.token=""
        this.isauthenticated=false;
        this.authStatusListener.next(false)
        this.userId=null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/"]);
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId=authInformation.userId;
      this.isauthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }


  private setAuthTimer(duration: number) {
    //console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date,userId:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId=localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId:userId
    }
  }
  getloggedUserId(){
    return this.userId
  }
}
