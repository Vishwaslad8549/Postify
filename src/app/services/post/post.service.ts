import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, map } from 'rxjs';
import { Post } from 'src/app/models/posts';
const url="http://localhost:3000/api/posts";
@Injectable({
  providedIn: 'root'
})

export class PostService {
  mode:string=""
  constructor(private http:HttpClient,private router:Router) { }

    private posts:Post[]=[]
   private postsUpdated = new Subject<Post[]>();
   

  getPosts() {
    this.http.get<{message:string,posts:any}>("http://localhost:3000/api/posts")
    .pipe(map(postData=>{
      return postData.posts.map((post:any)=>{
        return {
          title:post.title,
          content:post.content,
          id:post._id
        };
      });
    }))
    .subscribe((transformedPost:Post[])=>{
      this.posts=transformedPost;
      //console.log(this.posts)
      this.postsUpdated.next([...this.posts])
    });
  }
  getPost(id:string){
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:3000/api/posts/" + id
    );
  
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(Post:Post) {
    const post: Post = {id:null,title: Post.title, content: Post.content};
    console.log(post)
    this.http.post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
    .subscribe(res=>{
      const id =res.postId;
      post.id=id
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    })
  }
  deletePost(id:string){
    this.http.delete("http://localhost:3000/api/posts/"+id)
    .subscribe(()=>{
      
      const updatedpost= this.posts.filter(post =>post.id!==id)
      this.posts=updatedpost
      console.log(this.posts)
      this.postsUpdated.next([...this.posts])
  })
  }
  updatePost(id:string,Post:Post){
    const post: Post = { id: id, title: Post.title, content: Post.content };
    this.http
      .put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(response => console.log(response));
  }
}
