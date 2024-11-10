import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private postservice:PostService){}
  data:any;
  ngOnInit(): void {
    this.postservice.getPosts().subscribe(d=>{
      this.data=d
      console.log(d)
    })
  }
  
  
}
