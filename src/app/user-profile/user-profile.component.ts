import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  nickName: string;

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.authService.checkSession().subscribe(
      user => {
        if (user) {
          this.user = user;
          console.log(this.user);
        }
      }
    );

    this.databaseService.getUserDetails().subscribe(
      data => {
        this.nickName = data.nickName;
      }
    );
    
  }

}
