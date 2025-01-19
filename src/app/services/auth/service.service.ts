import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../../../app/models/auth';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

//const url=environment.apiUrl;
const url="http://localhost:3000/api/"
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public isUserAuthenticated = new Subject<boolean>
  private token!: string;
  public isauthenticated!: boolean;
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
  setToken(token){
    this.token=token;
  }
  isAuth(){
    return this.isauthenticated;
  }
  setisAuth(isauthenticated){
    this.isauthenticated=isauthenticated
  }
  getUserAuthenticated(){
    return this.isUserAuthenticated.asObservable()
  }
  loginUser(email:string,password:string):Observable<any>{
      const AuthData:AuthData={email:email,password:password}
      return this.http.post<{token:string}>(url+"user/login",AuthData).pipe(
        catchError(this.handleError)
      );
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
        this.isUserAuthenticated.next(false)
  }

  get jsondata(){
    return (this.http.get("https://jsonplaceholder.typicode.com/posts"))
  }
}
