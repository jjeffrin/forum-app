import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  nickName: string;
  nickNameUpdating: boolean = false;
  theme: string;

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.nickNameUpdating = true;
    this.databaseService.getUserDetails().subscribe(
      data => {
        this.nickName = data.nickName;
        this.theme = data.theme;
        this.nickNameUpdating = false;
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
    this.nickNameUpdating = true;
    this.databaseService.setTheme(this.theme).then(
      () => {
        this.nickNameUpdating = false;
      }
    )
  }
}
