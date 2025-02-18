import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ServiceService } from 'src/app/services/auth/service.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  loginFailed: boolean = false;
  authSub:Subscription;
  errorMessage:string="";
  expiresInDuration:number;
  tokenTimer:any
  userData: any = null;
  formData:any;
  routingObs=new Subject<boolean>
  url=environment.apiUrl;
  //url="http://localhost:3000/api/"
  constructor(private http:HttpClient,private router: Router,public authservice:ServiceService,private googleAuthService: GoogleAuthService, private ngZone: NgZone,public loaderService: LoaderService) { }

  handleLogin(formvalue:NgForm) {
    this.formData=formvalue
    if(formvalue.invalid){
      return
    } 
    this.loaderService.show();
    this.authservice.loginerrorMessage.subscribe(err=>{
      this.errorMessage=err
     });
     this.authservice.loginUser(formvalue.value.email,formvalue.value.password)
  }
  ngAfterViewInit(): void {
    this.routingObs.subscribe(res=>{
      if(res) {
        this.loaderService.hide();
        this.router.navigate(['home'])
        this.authservice.setisAuth(true)
        this.authservice.authStatusListener.next(true);
      }
  })
    this.googleAuthService.attachSignin(
      document.getElementById('googleSignInBtn') as HTMLElement,
      (response) => {
          this.loaderService.show();
          this.handleCredentialResponse(response)
  });
  }

  handleCredentialResponse(response: any): void {
    const token = response.credential;  // Google ID token

    this.http.post(this.url+'user/googleauth', { token })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.authservice.setToken(res.token);
          localStorage.setItem("token", res.token);
          localStorage.setItem("userId",res.userId)
          this.routingObs.next(true)
          this.ngZone.run(() => {
            this.userData = res.user;
            
            
          });
          
        },
        (error) => console.error('Login Failed:', error)
      );
  }

}

