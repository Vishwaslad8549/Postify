import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  constructor() { }
  formdata:any={};
  getFormData(){
return this.formdata
  }
  setFormData(formData:any){
    this.formdata=formData
  }
}
