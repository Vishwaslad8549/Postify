import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  constructor(private postsService:PostService,private activateroute:ActivatedRoute){
    //this.postsService.mode="create"
  }
  ngOnInit(): void {
    

  }
  onAddPost() {
    this.postsService.addPost(this.Post);
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