import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  selectUser:User;
  users:User[];
  user:User;
  private url = "http://localhost:4000/users"

  constructor(private http:HttpClient) {
    this.selectUser = new User();
   }
   getUsers(){
     return this.http.get<User[]>(this.url);
   }
   deleteUser(_id:string){
     return this.http.delete(this.url + `/${_id}`)
   }

   
}
