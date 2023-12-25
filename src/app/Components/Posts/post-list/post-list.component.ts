import { AfterContentChecked, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnChanges{
  Posts:Post[]=[];
  private postsSub!: Subscription;
  
constructor(private postservice:PostService,private router:Router){
 
}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

ngOnInit() {
  this.postservice.getPosts();
  this.postsSub = this.postservice.getPostUpdateListener()
  .subscribe((posts: Post[]) => {
    console.log(posts)
    this.Posts = posts;
  });
}
onEdit(id:string){
  //this.postservice.mode="edit"
  this.router.navigateByUrl("home/edit/"+id)
}
onDelete(id:string){
  
this.postservice.deletePost(id)
}

}
