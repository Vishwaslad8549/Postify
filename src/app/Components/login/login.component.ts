import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = 'Vishwas'
  password = '123456'
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  //Router
  //Angular.giveMeRouter
  //Dependency Injection
  constructor(private router: Router,private authservice:AuthService) { }

  ngOnInit() {
  }

  handleLogin() {
    
    if(this.authservice.authenticate(this.username, this.password)) {
      //Redirect to Welcome Page
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }
}
