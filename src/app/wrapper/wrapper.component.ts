import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  theme: string;
  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.checkSession().subscribe(
      data => {
        if (data) {
          this.databaseService.getUserDetails(data.uid).subscribe(
            (data: any) => {
              console.log("wrapper change")
              this.theme = data.theme;
            }
          );
        } else {
          this.theme = "light"
        }
      }
    )
    
  }

}
