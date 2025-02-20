import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  isMenuOpen = false;
  @ViewChild('navbar') navbar!: ElementRef;
constructor(public authservice:ServiceService){
}
  ngOnInit(): void {
    this.authSubs=this.authservice.getAuthStatusListener().subscribe((res)=>{
      this.Isloggedin=res
    })
  }
  ngOnDestroy(): void {
      this.authSubs.unsubscribe()
  }
  onLogout(){
    this.authservice.logout()
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.navbar.nativeElement.contains(event.target) && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}
