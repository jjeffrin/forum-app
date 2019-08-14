import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  theme: string;
  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.databaseService.getUserDetails().subscribe(
      data => {
        this.theme = data.theme;
      }
    )
  }

}
