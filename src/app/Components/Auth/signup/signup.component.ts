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
  errorMessage:string="";
  constructor(private router: Router,private authservice:ServiceService) { }
  handleSignup(formData:NgForm){
    if(formData.invalid){
      return
    }
    this.authservice.signuperrorMessage.subscribe(res=>{
      this.errorMessage=res
      this.isSignup=false
    })
    this.authservice.createUser(formData.value.email,formData.value.password,formData.value.name);
    this.isSignup=true
    setTimeout(()=>{
      this.isSignup=false
    },3000)
  }
}
