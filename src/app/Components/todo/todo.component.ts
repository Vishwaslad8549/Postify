import { Component } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  todos:Todo[]=[];
  constructor(){
    this.todos=[{description:"jnfjasn",id:1,done:true,targetDate:new Date('2023-09-24')}
  ]
  }
  addTodo(){
    alert("Button Clicked")
  }
  updateTodo(id:number){
    alert("Button Clicked")
  }
  deleteTodo(id:number){
    alert("Button Clicked")
  }
}
