import { Component } from '@angular/core';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'latest-angular-postify';
  data: any;
  constructor(private postservice:PostService){}
  oninit(){
    this.postservice.getPosts().subscribe(d=>{
      this.data=d
    })
  }
}
