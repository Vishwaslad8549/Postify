import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/auth/service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isSignup:boolean=false;
  constructor(private router: Router,private authservice:ServiceService) { }
  handleSignup(formData:NgForm){
    if(formData.invalid){
      return
    }
    this.authservice.createUser(formData.value.email,formData.value.password);
    this.isSignup=true
    setTimeout(()=>{
      this.isSignup=false
    },3000)
  }
}
