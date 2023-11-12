import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { WelcomedataService } from 'src/app/services/data/welcomedata.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements AfterContentChecked{
@Input() formdata={};
  todos:Todo[]=[];
  item2:any;
  constructor(private dataservice:WelcomedataService){
    this.item2={id:2,itemId:2,name:"Jeet",userId:21,completed:true}
    this.todos=[{id:1,itemId:1,name:"zeel",userId:43,completed:true},
    {id:3,itemId:3,name:"Kunal",userId:71,completed:false},
    {id:4,itemId:4,name:"chirag",userId:41,completed:false},
    {id:5,itemId:5,name:"ayush",userId:11,completed:false}
  ]
  }
  ngAfterContentChecked(): void {
    console.log(this.formdata)
    // this.todos.push(this.formdata)
  }
  ngOnInit(): void {
   
  }
  addTodo(){
    alert("Button Clicked")
  }

  createNewItem() {
    this.dataservice.createItem(this.item2).subscribe(
      (data) => {
        // Handle success, e.g., show a success message or navigate to a different view
        console.log('Item created:', data);
      },
      (error) => {
        // Handle error, e.g., display an error message
        console.error('Error creating item:', error);
      }
    );
    this.todos.push(this.item2);
  }
  updateTodo(id:number){
    this.dataservice.updateItem(id,{id:2,itemId:2,name:"zzzzzzzzzz",userId:31,completed:true}).subscribe(d=>{
      console.log(d)
    })
      }
      deleteTodo(id:number){
        this.dataservice.deleteItem(id).subscribe(d=>{
          console.log(d);
        })
      }
}
