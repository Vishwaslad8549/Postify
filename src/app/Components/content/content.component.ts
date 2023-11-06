import { Component, OnInit } from '@angular/core';
import { WelcomedataService } from 'src/app/services/data/welcomedata.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{
  message:any;
  item1: any;
  item2: any;
  constructor(private dataservice:WelcomedataService){
    
  }
  ngOnInit(): void {
    this.item1={id:1,name:"Vishwas",userId:12,completed:true}
    this.item2={id:2,name:"Jeet",userId:21,completed:false}
  }

  createNewItem() {
    this.dataservice.createItem(this.item1).subscribe(
      (data) => {
        // Handle success, e.g., show a success message or navigate to a different view
        console.log('Item created:', data);
      },
      (error) => {
        // Handle error, e.g., display an error message
        console.error('Error creating item:', error);
      }
    );
  }
  createNewItem2(){
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
  }
  
  btnclick(){
    console.log(this.dataservice.getmessage())
    this.dataservice.getmessage().subscribe(d=>{
      this.handlemessage(d),
      (error: any) => {
        // Handle error
        console.error(error);
      }
     
    })
  }
  handlemessage(data:any) {
    console.log(data.message)
  }
  updateItem(){
this.dataservice.updateItem(1,{id:1,name:"zzzzzzzzzz",userId:31,completed:true}).subscribe(d=>{
  console.log(d)
})
  }
  deleteItem(){
    this.dataservice.deleteItem(1).subscribe(d=>{
      console.log(d);
    })
  }
}
