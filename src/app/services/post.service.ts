import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Router } from '@angular/router';
import { Subject, catchError, map, throwError } from 'rxjs';
import { Post } from '../models/posts';
import { environment } from 'src/environments/environment';

//const url = environment.apiUrl;
const url="http://localhost:3000/api/"
//const url = environment.apiUrl;
const url="http://localhost:3000/api/"
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  // getPosts(){
  //   return this.http.get(API_URL+"/api/posts")
  // }
  mode: string = ""
  constructor(private http: HttpClient, private router: Router,private loaderService:LoaderService) { }

  private posts: Post[] = []
  private postsUpdated = new Subject<Post[]>();


  getPosts() {
    this.http.
    get<{ message: string, posts: any }>(url+"cloud")
      .pipe(
        map(postData => {
        return postData.posts.map((post: any) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath:post.imagePath,
            creator:post.creator
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
    return this.http.get<{ _id: string; title: string; content: string,imagePath:string,creator:string}>(
      url+"cloud/"+ id
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
     this.http.post<{ message: string, post: Post }>(url+"cloud", postData)
     .pipe(
      catchError((error: HttpErrorResponse) => {
        //console.error("Error occurred while adding post:", error);
        return throwError(() => error);
      })
    )
      .subscribe(responsedata => {
        this.loaderService.hide();
        const post: Post = {
          id: responsedata.post.id,
          title: responsedata.post.title,
          content: responsedata.post.content,
          imagePath:responsedata.post.imagePath,
          creator:responsedata.post.creator
        }
        //console.log(post)
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        
      })
  }
  deletePost(id: string) {
    this.http.delete(url +"cloud/" + id)
      .subscribe(() => {

        const updatedpost = this.posts.filter(post => post.id !== id)
        this.posts = updatedpost
        //console.log(this.posts)
        this.postsUpdated.next([...this.posts])
      })
  }
  updatePost(id: string, Post: Post) {
    const postData = new FormData()
    postData.append("title", Post.title)
    postData.append("content", Post.content)
    postData.append("image", Post.image)
    //const post: Post = { id: id, title: Post.title, content: Post.content,imagePath:Post.imagePath,creator:null };
    //console.log(post)
    this.http
      .put(url +"cloud/" + id, postData)
      .subscribe(response => {
        console.log(response)
        this.loaderService.hide();  
      });
  }
  getcloudImage(){
    
  }
}
