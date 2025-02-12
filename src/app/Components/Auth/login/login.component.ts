import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ServiceService } from 'src/app/services/auth/service.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFailed: boolean = false;
  authSub:Subscription;
  errorMessage:string="";
  expiresInDuration:number;
  tokenTimer:any
  constructor(private router: Router,public authservice:ServiceService) { }

  handleLogin(formvalue:NgForm) {
    if(formvalue.invalid){
      return
    } 
    this.authservice.loginerrorMessage.subscribe(err=>{
      this.errorMessage=err
     });
     this.authservice.loginUser(formvalue.value.email,formvalue.value.password)
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

