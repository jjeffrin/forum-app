import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  nickName: string;
  nickNameUpdating: boolean = false;
  theme: string;
  uid: string;

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.nickNameUpdating = true;
    this.authService.checkSession().subscribe(
      data => {
        if (data) {
          this.databaseService.getUserDetails(data.uid).subscribe(
            (data: any) => {
              this.uid = data.uid;
              this.nickName = data.nickName;
              this.theme = data.theme;
              this.nickNameUpdating = false;
            }
          );
        }
      }
    )

  }

  generateName() {
    var UsernameGenerator = require('username-generator');
    this.nickName = UsernameGenerator.generateUsername();
  }

  selectNickName() {
    this.nickNameUpdating = true;
    // Merge the username with the User Database record
    this.databaseService.setNickName(this.nickName).then(
      () => {
        this.nickNameUpdating = false;
      }
    );
  }

  selectTheme() {
    console.log(this.theme);
    this.nickNameUpdating = true;
    this.authService.checkSession().subscribe(
      data => {
        if (data) {
          this.databaseService.setTheme(this.theme, data.uid).then(
            () => {
              this.nickNameUpdating = false;
            }
          );
        }
      }
    )
  }
}
