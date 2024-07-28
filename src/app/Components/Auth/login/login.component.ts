import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = 'Vishwas'
  password = 'zyNxx'
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  constructor(private router: Router,private authservice:AuthService) { }
  token:string;
  ngOnInit() {
  }
  getdata(){
    this.authservice.jsondata.subscribe(D=>{
      console.log(D)
    })
  }
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
