import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { TODO_JPA_API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  constructor(private http:HttpClient) { }
  formdata:any={};
  getFormData(){
    console.log(this.formdata)
return this.formdata

  }
  setFormData(formData:any){
    this.formdata=formData
  }
  createTodo(username: string, todo: Todo) {
    return this.http.post(
      `${TODO_JPA_API_URL}/items`
      , todo);
  }
}
