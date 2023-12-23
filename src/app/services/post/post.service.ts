import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/app/models/posts';
const url="http://localhost:3000/posts";
@Injectable({
  providedIn: 'root'
})

export class PostService {
  
  constructor(private http:HttpClient) { }

    private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    this.http.get(url).subscribe(res=>{
      console.log(res)
    })
    return [...this.posts];
    
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
 
    this.http.post(url,this.postsUpdated).subscribe(res=>{
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    })
  }

}
