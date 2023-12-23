import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Items } from 'src/app/models/Items';

@Injectable({
  providedIn: 'root'
})
export class WelcomedataService {
  private baseUrl = 'http://localhost:8080/api/items'
  
  
  constructor(private http:HttpClient) { }
  createItem(item: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(item)
    return this.http.post(`${this.baseUrl}`, JSON.stringify(item), { headers });
  }
  getmessage(){
    return this.http.get("http://localhost:8080/api/items",
    {responseType: 'json'})
  }
  updateItem(id: number, updatedItem: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(id,updatedItem);
    return this.http.put(`${this.baseUrl}/${id}`, JSON.stringify(updatedItem), { headers });
    
  }
  deleteItem(id:number):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(id);
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
}
