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
  userId:string;
  filteredPosts:Post[]
  searchTerm: string = '';
  sortOrder: string = 'newest';
constructor(private postservice:PostService,private router:Router,private authService:ServiceService){
}
selectedImage: string | null = null;

  openImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  closeImage() {
    this.selectedImage = null;
  }

ngOnInit() {
 
  this.postservice.getPosts();
  this.userId=localStorage.getItem("userId");
  console.log(this.userId)
  this.postsSub = this.postservice.getPostUpdateListener()
  .subscribe((posts: Post[]) => {
    console.log(posts)
    this.Posts = posts;
    this.filteredPosts = [...this.Posts];
    this.sortPostsByDate();
  });
  this.isauthenticated=this.authService.isAuth()
  this.authSub=this.authService.getAuthStatusListener().
  subscribe(isauth=>{
    this.userId=this.authService.getloggedUserId()
    this.isauthenticated=isauth
    //console.log(isauth)
  })
  
}
onEdit(id:string){
  //this.postservice.mode="edit"
  this.router.navigateByUrl("post/edit/"+id)
  //console.log("Edit clicked",id)
  
}
onDelete(id:string){
  
this.postservice.deletePost(id)
}
toggleReadMore(index: number) {
  this.Posts[index].isExpanded = !this.Posts[index].isExpanded;
}
ngOnDestroy(): void {
  this.postsSub.unsubscribe()
  this.authSub.unsubscribe()
}
filterPosts(): void {
  this.filteredPosts = this.Posts.filter(post =>
    post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  this.sortPostsByDate(); // Re-sort after filtering
}

sortPostsByDate(): void {
  this.filteredPosts = [...this.filteredPosts].sort((a, b) => {
    const dateA = new Date(a.creationDate).getTime();
    const dateB = new Date(b.creationDate).getTime();

    if (this.sortOrder === 'newest') {
      return dateB - dateA; // Newest first
    } else {
      return dateA - dateB; // Oldest first
    }
  });
}
}
