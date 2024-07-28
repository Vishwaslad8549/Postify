import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/Auth/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private http:HttpClient,private Auth:AuthService){}
  onSignup(formData:NgForm){
    // this.http.post("http://localhost:3000/api/user/signup",formData.value);
    // console.log(formData.value)
    if(formData.invalid){
      return
    }
    this.Auth.createUser(formData.value.email,formData.value.password);
  }
}
