import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http:HttpClient) { }
  getPosts(){
    return this.http.get(API_URL+"/api/posts")
  }
}
