import { AfterContentChecked, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts';
import { AuthService } from 'src/app/services/Auth/service/auth.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{
  Posts:Post[]=[];
  private postsSub!: Subscription;
  private authSub:Subscription;
  isauthenticated: boolean=false;
  
constructor(private postservice:PostService,private router:Router,private authService:AuthService){
 
}
ngOnInit() {
 
  this.postservice.getPosts();
  this.postsSub = this.postservice.getPostUpdateListener()
  .subscribe((posts: Post[]) => {
    console.log(posts)
    this.Posts = posts;
  });
  this.isauthenticated=this.authService.isAuth()
  this.authSub=this.authService.getUserAuthenticated().subscribe(isauth=>{
    this.isauthenticated=isauth
    console.log(isauth)
  })
  
}
onEdit(id:string){
  //this.postservice.mode="edit"
  this.router.navigateByUrl("home/edit/"+id)
  console.log("Edit clicked",id)
  
}
onDelete(id:string){
  
this.postservice.deletePost(id)
}
ngOnDestroy(): void {
  this.postsSub.unsubscribe()
  this.authSub.unsubscribe()
}

}
