import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Router } from '@angular/router';
import { Subject, catchError, map, throwError } from 'rxjs';
import { Post } from '../models/posts';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
const url = environment.apiUrl;
//const url="http://localhost:3000/api/"



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
    get<{ message: string, posts: any }>(url+"posts")
      .pipe(
        map(postData => {
        return postData.posts.map((post: any) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath:post.imagePath,
            creator:post.creator._id,
            creationDate:post.creationDate,
            comments:post.comments,
            likes:post.likes
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
    return this.http.get<{ _id: string; title: string; content: string,imagePath:string,creator:string,creationDate:string,comments:string[],likes:string[]}>(
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
     this.http.post<{ message: string, post: Post }>(url+"posts", postData)
     .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("Error occurred while adding post:", error.message);
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
          creator:responsedata.post.creator,
          creationDate:responsedata.post.creationDate,
          comments:[],
          likes:[]
        }
        //console.log(post)
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        
      })
  }
  deletePost(id: string) {
    const options = { body: { userId:localStorage.getItem('userId') } }; 
    
    
    this.http.delete(url +"posts/" + id, options)
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
      .put(url +"posts/" + id, postData)
      .subscribe(response => {
        console.log(response)
        this.loaderService.hide();  
      });
  }
  getcloudImage(){
    
  }
}
