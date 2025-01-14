import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts';
import { ServiceService } from 'src/app/services/auth/service.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  Posts:Post[]=[];
  private postsSub!: Subscription;
  private authSub:Subscription;
  isauthenticated: boolean=false;
constructor(private postservice:PostService,private router:Router,private authService:ServiceService){
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
