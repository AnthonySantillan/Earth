import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {


  constructor(public usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(
      (res) => {
        this.usersService.users = res;
      }, err => {
        if (err instanceof HttpErrorResponse) {
          this.router.navigate(['/authetication/login'])
        }
      }
    )
  }

  deleteUser(_id: string, form: NgForm) {
    this.usersService.deleteUser(_id).subscribe(
      (res) => {
        this.getUsers();
        this.resetForm(form);
      }
    );
  }

  putUser(form?: NgForm){
    if(form.value._id){
      this.usersService.updateUser(form.value).subscribe(
        (res) =>{
          this.getUsers();
        },(err) =>{console.log(err);}
      )
    };
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.usersService.selectUser = new User();
    }
  }

  updateUser(user: User){
    this.usersService.selectUser = user;
  }
}

