import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from '../../services/auth/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  Isloggedin!:Boolean;
  authSubs!:Subscription;

constructor(public authservice:ServiceService){
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
