import { Component, OnInit } from '@angular/core';
import { PostService } from './services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  constructor(private router:Router){}
  ngOnInit(): void {
    if(localStorage.getItem('token')) 
      this.router.navigate(['/home'])
    else this.router.navigate(['']);
  }
  title = 'latest-angular-postify';
  data: any;
  
}
