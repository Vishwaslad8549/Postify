import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';

import { TodoserviceService } from 'src/app/services/todoservice.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  formData = {
    itemId: null,
    userId:null,
    name:'',
    completed:''

    
  };
  id:number=0;
  todo: Todo = { userId:this.id,
    name:"",
    id:1,
    itemId:1,
    completed:true}
  constructor(private todoservice:TodoserviceService,private route:ActivatedRoute,private router:Router){

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.todo = { userId:this.id,
      name:"",
      id:1,
      itemId:1,
      completed:true}
  }
onSubmit(form:NgForm){
// this.todoservice.setFormData(form.value)
// this.router.navigate(['first']);
// console.log(form.value)
this.todoservice.createTodo('in28minutes', this.todo)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['todos',-1])
          }
        )
}
}
