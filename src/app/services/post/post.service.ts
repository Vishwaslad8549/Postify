import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Post } from 'src/app/models/posts';
const url="http://localhost:3000/api/posts";
@Injectable({
  providedIn: 'root'
})

export class PostService {
  mode:string=""
  constructor(private http:HttpClient) { }

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
    .subscribe(transformedPost=>{
      this.posts=transformedPost;
      //console.log(this.posts)
      this.postsUpdated.next([...this.posts])
    });
  }
  getPost(id:string){
    console.log(this.posts)
    return {...this.posts.find(p=>{p.id===id})};
    //  this.http.get<{message:string,posts:any}>(
    //   "http://localhost:3000/api/posts/" + id
    // ).pipe(map(postData=>{
    //   return postData.posts.map((post:any)=>{
    //     return {
    //       title:post.title,
    //       content:post.content,
    //       id:post._id
    //     };
    //   });
    // }))
    // .subscribe(transformedPost=>{
    //   this.posts=transformedPost;
    //   console.log(this.posts)
     
    // });
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

}
