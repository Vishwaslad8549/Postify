import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy{
  Isloggedin:Boolean;
  authSubs:Subscription;

constructor(public authservice:AuthService){
}
  ngOnInit(): void {
    this.authSubs=this.authservice.getUserAuthenticated().subscribe((res)=>{
      this.Isloggedin=res
    })
  }
  ngOnDestroy(): void {
      this.authSubs.unsubscribe()
  }
  onLogout(){
    this.authservice.logout()
  }
}
