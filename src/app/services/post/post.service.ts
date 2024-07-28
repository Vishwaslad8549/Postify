import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, map } from 'rxjs';
import { Post } from 'src/app/models/posts';
import { environment } from 'src/environments/environment.development';
const url = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})

export class PostService {
  mode: string = ""
  constructor(private http: HttpClient, private router: Router) { }

  private posts: Post[] = []
  private postsUpdated = new Subject<Post[]>();


  getPosts() {
    this.http.
    get<{ message: string, posts: any }>(url+"posts")
      .pipe(
        map(postData => {
        return postData.posts.map((post: any) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath:post.imagePath
          };
        });
      }))
      .subscribe((transformedPost: Post[]) => {
        this.posts = transformedPost;
        //console.log(this.posts)
        this.postsUpdated.next([...this.posts])
      });
  }
  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string,imagePath:string }>(
      url+"posts/"+ id
    );

  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(Post: Post) {
    const postData = new FormData()
    postData.append("title", Post.title)
    postData.append("content", Post.content)
    postData.append("image", Post.image, Post.title)
    //const post: Post = {id:null,title: Post.title, content: Post.content};
    console.log(postData)
     this.http.post<{ message: string, post: Post }>(url+"posts", postData)
      .subscribe(responsedata => {
        const post: Post = {
          id: responsedata.post.id,
          title: responsedata.post.title,
          content: responsedata.post.content,
          imagePath:responsedata.post.imagePath
        }
        console.log(post)
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })
  }
  deletePost(id: string) {
    this.http.delete(url +"posts/" + id)
      .subscribe(() => {

        const updatedpost = this.posts.filter(post => post.id !== id)
        this.posts = updatedpost
        console.log(this.posts)
        this.postsUpdated.next([...this.posts])
      })
  }
  updatePost(id: string, Post: Post) {
    const post: Post = { id: id, title: Post.title, content: Post.content,imagePath:null };
    this.http
      .put(url +"posts/" + id, post)
      .subscribe(response => console.log(response));
  }
}
