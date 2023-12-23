import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { WelcomedataService } from 'src/app/services/data/welcomedata.service';
import { TodoserviceService } from 'src/app/services/todoservice.service';

@Component({
  selector: 'app-listtodo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class ListTodoComponent implements AfterContentChecked{
@Input() formdata={};
  todos:Todo[]=[];
  item:any;
  
  constructor(private dataservice:WelcomedataService,private todoservice:TodoserviceService,private router:Router){
    
    this.todos=[{id:1,itemId:1,name:"zeel",userId:43,completed:true},
    {id:3,itemId:3,name:"Kunal",userId:71,completed:false},
    {id:4,itemId:4,name:"chirag",userId:41,completed:false},
    {id:5,itemId:5,name:"ayush",userId:11,completed:false}
  ]
  }
  ngAfterContentChecked(): void {
    
   
   
  }
  ngOnInit(): void {
   
  }
  
  oncreate(){
    // this.item=this.todoservice.getFormData()
    // this.todos.push(this.todoservice.getFormData());
    // this.dataservice.createItem(this.item)
    this.router.navigate(["todos",-1])
    
  }
  click(){
    this.todos.push(this.todoservice.getFormData())
  }
  // createNewItem() {
  //   this.dataservice.createItem(this.item2).subscribe(
  //     (data) => {
  //       // Handle success, e.g., show a success message or navigate to a different view
  //       console.log('Item created:', data);
  //     },
  //     (error) => {
  //       // Handle error, e.g., display an error message
  //       console.error('Error creating item:', error);
  //     }
  //   );
  //   this.todos.push(this.item2);
  // }
  updateTodo(id:number){
    this.dataservice.updateItem(id,{id:2,itemId:2,name:"zzzzzzzzzz",userId:31,completed:true}).subscribe(d=>{
      console.log(d)
    })
      }
      deleteTodo(id:number){
        this.dataservice.deleteItem(id).subscribe(d=>{
          console.log(d,id);
        })
      }
}
