import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
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

  deleteUser(_id: string) {
    this.usersService.deleteUser(_id).subscribe(
      (res) => {
        this.getUsers();
      }
    );
  }
}

