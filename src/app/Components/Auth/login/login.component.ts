import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/auth/service.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router,private authservice:ServiceService) { }

  handleLogin(formvalue:NgForm) {
    this.authservice.loginUser(formvalue.value.email,formvalue.value.password)
    //this.token=this.authservice.getToken()
  
    
  //   if(this.authservice.authenticate(formvalue.value.email, formvalue.value.password)) {
  //     //Redirect to Welcome Page
  //     this.router.navigate(['home'])
  //     this.invalidLogin = false
  //   } else {
  //     this.invalidLogin = true
  //   }
    }
}

