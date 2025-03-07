import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts';
import { ServiceService } from 'src/app/services/auth/service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';
const url="http://localhost:3000/api/"
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
//const url=environment.apiUrl;

export class PostListComponent {
  
  Posts:Post[]=[];
  private postsSub!: Subscription;
  private authSub:Subscription;
  isauthenticated: boolean=false;
  userId:string;
  filteredPosts:Post[]
  searchTerm: string = '';
  sortOrder: string = 'newest';
  isCommentPopup=false
  selectedPostId: string | null = null;
  newComment: string;
  commentsMap: { [postId: string]: BehaviorSubject<any[]> } = {};
constructor(private postservice:PostService,public loaderservice:LoaderService,private router:Router,private authService:ServiceService,private http:HttpClient){
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
  this.loaderservice.show()
  this.postsSub = this.postservice.getPostUpdateListener()
  .subscribe((posts: Post[]) => {
    console.log(posts)
    this.Posts = posts;
    this.filteredPosts = [...this.Posts];
    this.loaderservice.hide()
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
  
  this.router.navigateByUrl("post/edit/"+id)
  //console.log("Edit clicked",id)
  
}
onDelete(id:string){
  
this.postservice.deletePost(id)
}
getMypost(){
  
  this.filteredPosts=[...this.filteredPosts.filter(user=>user.creator==localStorage.getItem('userId'))]
}
getAllpost(){
  this.filteredPosts=[...this.Posts];
  this.sortPostsByDate(); 
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
  this.sortPostsByDate(); 
}

sortPostsByDate(): void {
  this.filteredPosts = [...this.filteredPosts].sort((a, b) => {
    const dateA = new Date(a.creationDate).getTime();
    const dateB = new Date(b.creationDate).getTime();

    if (this.sortOrder === 'newest') {
      return dateB - dateA; 
    } else {
      return dateA - dateB; 
    }
  });
}
onLike(id){
alert("Like clicked")
}
onCommentClick(id){
  // alert("comment clicked")
  this.isCommentPopup=!this.isCommentPopup
  this.selectedPostId=id
  const currentpost=this.Posts.find(p=>p.id===id)
  console.log(currentpost)
  if (!this.commentsMap[id]) {
    this.commentsMap[id] = new BehaviorSubject<any[]>(currentpost.comments);
  }
  //this.logComments(id);
}
closeCommentPopup() {
  this.isCommentPopup=false
}
closepopup(e){
  this.newComment="";
  this.isCommentPopup=e
  this.selectedPostId = null;
}
addComment(){
  if (!this.newComment.trim()) return;

  const newComment = {
    userId:localStorage.getItem('userId'),
    text: this.newComment,
  };

  const postId = this.selectedPostId!;
  const currentComments = this.commentsMap[postId]?.getValue() || [];

  // Update the comments list for the specific post
  this.commentsMap[postId]?.next([...currentComments, newComment]);

  // Clear input
  this.http.post(url+"posts/"+this.selectedPostId+"/comment",newComment).subscribe((response: any) => {
          //console.log(response)
  }, (error) => {
    console.error('Error Commenting post:', error);
  });
  this.newComment = '';
}
logComments(postId: string) {
  const comments = this.commentsMap[postId]?.getValue() || [];
  //console.log(`Comments for post ${postId}:`, comments);
}
}
