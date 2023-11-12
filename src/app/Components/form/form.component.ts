import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoserviceService } from 'src/app/services/todoservice.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  formData = {
    itemId: null,
    userId:null,
    name:'',
    completed:''

    
  };
  constructor(private todoservice:TodoserviceService){

  }
onSubmit(form:NgForm){
this.todoservice.setFormData(form.value)
}
}
