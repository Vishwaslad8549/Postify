import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Router } from '@angular/router';
import { Subject, BehaviorSubject, catchError, map, throwError, tap, finalize} from 'rxjs';
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
  public uploadError = new BehaviorSubject<string | null>(null);


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
        this.postsUpdated.next([...this.posts])
      },
      (error)=>{
        this.loaderService.hide();
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

    // clear previous upload error
    this.uploadError.next(null);
    return this.http.post(url+"posts", postData)
      .pipe(
        tap((responsedata:any)=> {
          // success side-effect: hide loader and update local posts
          this.loaderService.hide();
          const postId = responsedata._id ?? responsedata.id;
          const post: Post = {
            id: postId,
            title: responsedata.title,
            content: responsedata.content,
            imagePath: responsedata.imagePath,
            creator: responsedata.creator,
            creationDate: responsedata.creationDate,
            comments: [],
            likes: []
          };
          this.posts.push(post);
          this.postsUpdated.next([...this.posts]);
        }),
        catchError((error: HttpErrorResponse) => {
          // stop loader and surface a friendly message
          this.loaderService.hide();
          let message = 'Something went wrong. Please try again.';
          if (error.status === 413 || (error.error && error.error.error === 'FILE_TOO_LARGE')) {
            const allowed = error.error?.allowedSizeReadable ?? (error.error?.allowedSize ? `${error.error.allowedSize} bytes` : 'the allowed limit');
            message = `${error.error?.message || 'File size exceeds the maximum allowed limit'} (Max: ${allowed}).`;
          } else if (error.error?.message) {
            message = error.error.message;
          }
          this.uploadError.next(message);
          console.error("Error occurred while adding post:", error);
          return throwError(() => error);
        }),
        finalize(() => this.loaderService.hide())

      );
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
    // clear previous upload error
    this.uploadError.next(null);
    return this.http
      .put(url +"posts/" + id, postData)
      .pipe(
        tap(response => {
          // any post-update side-effects can go here
          this.loaderService.hide();
        }),
        catchError((error: HttpErrorResponse) => {
          this.loaderService.hide();
          let message = 'Something went wrong. Please try again.';
          if (error.status === 413 || (error.error && error.error.error === 'FILE_TOO_LARGE')) {
            const allowed = error.error?.allowedSizeReadable ?? (error.error?.allowedSize ? `${error.error.allowedSize} bytes` : 'the allowed limit');
            message = `${error.error?.message || 'File size exceeds the maximum allowed limit'} (Max: ${allowed})`;
          } else if (error.error?.message) {
            message = error.error.message;
          }
          this.uploadError.next(message);
          return throwError(() => error);
        })
      );
  }
  getcloudImage(){
  }
}
