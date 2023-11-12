import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TodoserviceService } from 'src/app/services/todoservice.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent  {
  formData!:any;
constructor(private todoservice:TodoserviceService){

}
click(){
  this.formData=this.todoservice.getFormData();
}
}
