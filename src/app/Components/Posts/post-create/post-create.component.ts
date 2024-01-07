import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from 'src/app/models/posts';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  Posts:Post[]=[];
  Post:Post={
    id: '',
    title: '',
    content: ''
  };
  private mode:string="";
  
  private postId!:string;
  constructor(private postsService:PostService,private activateroute:ActivatedRoute,private router:Router){
    //this.postsService.mode="create"
  }
  ngOnInit(): void {
    this.activateroute.paramMap.subscribe(params=>{
      if(params.has('id')){
         this.postId=params.get('id')
        this.mode='edit';
        console.log(this.postId)
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.Post = {id: postData._id, title: postData.title, content: postData.content};
        });
        console.log(this.Post)
      }
      else{
        this.mode='create'
        this.postId=null;
      }
    })

  }
  onSavePost() {
    if (this.mode === "create") {
      this.postsService.addPost(this.Post);
      this.router.navigateByUrl('/home/list');
    } else {
      this.postsService.updatePost(
        this.postId,
        this.Post
      );
      this.router.navigateByUrl('/home/list');
    }
    this.Post={
      id: '',
      title: '',
      content: ''
    };
  }
}


// this.postsService.getPosts();
//       this.postsService.getPostUpdateListener()
//       .subscribe((posts: Post[]) => {
//         console.log(posts)
//         this.Posts = posts;
//       });
//     this.activateroute.paramMap.subscribe((paramMap:ParamMap)=>{
//       if(paramMap.has('postId')){
//         this.mode="edit"
//         this.postId=paramMap.get('postId')
//         this.Post=this.Posts.find(p=>{p.id===this.postId})
//         console.log(this.Post)
//       }
//       else {
//         this.mode="create";
//         this.postId=null;
//         console.log(this.mode)
//       }
//     })