import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ServiceService } from 'src/app/services/auth/service.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';
import { PostService } from 'src/app/services/post.service';

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
  constructor(private http:HttpClient,private router: Router,public authservice:ServiceService,private googleAuthService: GoogleAuthService, private ngZone: NgZone) { }

  handleLogin(formvalue:NgForm) {
    this.formData=formvalue
    if(formvalue.invalid){
      return
    } 
    this.authservice.loginerrorMessage.subscribe(err=>{
      this.errorMessage=err
     });
     this.authservice.loginUser(formvalue.value.email,formvalue.value.password)
  }
  ngAfterViewInit(): void {
    this.routingObs.subscribe(res=>{
      if(res) {
        this.authservice.setisAuth(true)
        this.authservice.authStatusListener.next(true);
        this.router.navigate(['home'])
        
      }
  })
    this.googleAuthService.attachSignin(
      document.getElementById('googleSignInBtn') as HTMLElement,
      (response) => {
        console.log(response)
          this.handleCredentialResponse(response)
  });
  }

  handleCredentialResponse(response: any): void {
    const token = response.credential;  // Google ID token

    this.http.post('http://localhost:3000/api/user/googleauth', { token })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.authservice.setToken(res.token);
          localStorage.setItem("token", res.token);
          localStorage.setItem("userId",res.userId)
          this.routingObs.next(true)
          this.ngZone.run(() => {
            this.userData = res.user;
            console.log('User Logged In:', this.userData);
            
          });
          
        },
        (error) => console.error('Login Failed:', error)
      );
  }
     // .subscribe({
  //     next: (response) => {
  //       // Handle successful login
  //       console.log('Login successful', response);
  //       if(response.token){
  //         this.authservice.setisAuth(true);
  //         this.authservice.setToken(response.token);
  //         this.expiresInDuration=response.expiresIn
  //         this.authservice.authStatusListener.next(true)
  //         this.errorMessage = null; 
  //         this.tokenTimer=setTimeout(()=>{
  //           this.authservice.logout()
  //           this.router.navigate(['/'])
  //         },this.expiresInDuration*1000)
  //         this.router.navigate(['home'])
          
  //       }
  //        // Clear error message
  //     },
  //     error: (err) => {
  //       // Handle error
  //       this.errorMessage = err.message;
  //     }
  //   })
  //   this.authSub=this.authservice.getAuthStatusListener().subscribe(isauth=>{
  //     this.loginFailed=isauth
  //     console.log(this.loginFailed)
  //   })
  //   //this.token=this.authservice.getToken()
  
    
  // //   if(this.authservice.authenticate(formvalue.value.email, formvalue.value.password)) {
  // //     //Redirect to Welcome Page
  // //     this.router.navigate(['home'])
  // //     this.invalidLogin = false
  // //   } else {
  // //     this.invalidLogin = true
  // //   }
  //}
}

