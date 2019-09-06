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
          console.log(user.displayName);
          this.user = user;   
          this.databaseService.getUserDetails(user.uid).subscribe(
            (data: any) => {
              console.log(data);
              this.nickName = data.nickName;
              console.log(this.nickName);
            }
          );             
        }
      }
    );    
  }

}
