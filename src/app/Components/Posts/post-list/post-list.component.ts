import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Comment, Post } from 'src/app/models/posts';
import { ServiceService } from 'src/app/services/auth/service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';
import { DeleteConfirmationComponent } from '../../reusable/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { CommentService } from 'src/app/services/comment.service';
const url="http://localhost:3000/api/"
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
  newComment:string;
  isCommentPopup: boolean = false;
  likes:number;
  comments:any[];
  postcomment:any[];
  currentCommentId:string;
  commentsMap: { [postId: string]: BehaviorSubject<any[]> } = {};
  selectedImage: string | null = null;
  selectedPostId: string | null = null;
constructor(private postservice:PostService,
            private http:HttpClient,
            public loaderservice:LoaderService,
            private router:Router,
            public authService:ServiceService,
            private dialog: MatDialog,
            public Commentservice:CommentService){
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
    posts.forEach(post => {
      if (!this.commentsMap[post._id]) {
        this.commentsMap[post._id] = new BehaviorSubject(post.comments || []);
      }
    });
    this.loaderservice.hide()
    this.sortPostsByDate();
  });
  this.isauthenticated=this.authService.isAuth()
  console.log(this.isauthenticated)
  this.authSub=this.authService.getAuthStatusListener().
  subscribe(isauth=>{
    this.userId=this.authService.getloggedUserId()
    this.isauthenticated=isauth
    console.log(isauth)
  })  
}



openImage(imageUrl: string) {
  this.selectedImage = imageUrl;
}

closeImage() {
  this.selectedImage = null;
}
onEdit(id:string){
  
  this.router.navigateByUrl("post/edit/"+id)
  //console.log("Edit clicked",id)
  
}

onDelete(id:string){
  const dialogRef = this.dialog.open(DeleteConfirmationComponent,{
    width: '400px',
    minHeight: '130px'
  });

  dialogRef.afterClosed().subscribe((confirmed) => {
    if (confirmed) {
this.postservice.deletePost(id)
    }
  })
}
getMypost(){
  this.filteredPosts=[...this.filteredPosts.filter(user=>user.creator._id==localStorage.getItem('userId'))]
  console.log(this.filteredPosts)
  if(this.filteredPosts.length==0){
    console.log(this.filteredPosts,"empty")
  }
}
getAllpost(){
  this.filteredPosts=[...this.Posts];
  this.sortPostsByDate(); 
}
toggleReadMore(index: number) {
  this.Posts[index].isExpanded = !this.Posts[index].isExpanded;
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
const userData={
  userId:this.userId
}
this.http.post(url+"posts/"+id+"/like",userData).subscribe((response: any) => {
        this.filteredPosts = this.filteredPosts.map(post => {
          if (post._id === id) {
            return { ...post, likes: response.post.likes }; // Update likes from response
          }
          return post;
        });
      }, (error) => {
        console.error('Error liking/unliking post:', error);
      });
}

isLiked(post: Post): boolean {
  console.log(this.filteredPosts)
  console.log(this.userId)
  return post.likes.includes(this.userId);
}
onComment(postId){
  // alert(id+" Clicked")
  this.isCommentPopup=true
  this.selectedPostId = postId;
  
}
addComment(){
  const userData={
    userId:this.userId,
    text:this.newComment
  }
  if (this.newComment.trim() && this.selectedPostId) {
    const newCommentObj = { text: this.newComment };

    // Get the current comments and update
    const currentComments = this.commentsMap[this.selectedPostId].getValue();
    const updatedComments = [...currentComments, newCommentObj].reverse();

    // Update BehaviorSubject to trigger change detection
    this.commentsMap[this.selectedPostId].next(updatedComments);
  }
  this.http.post(url+"posts/"+this.selectedPostId+"/comment",userData).subscribe((response: any) => {
          
        }, (error) => {
          console.error('Error Commenting post:', error);
        });
  this.newComment="";
}
closepopup(e){
  this.newComment="";
  this.isCommentPopup=e
  this.selectedPostId = null;
}

ngOnDestroy(): void {
  this.postsSub.unsubscribe()
  this.authSub.unsubscribe()
}
}
