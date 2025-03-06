import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
private Comment =new BehaviorSubject<Comment[]>([])
Comment$=this.Comment.asObservable();
addComment(s){
  this.Comment.next(s)
  console.log(s)
}

}
