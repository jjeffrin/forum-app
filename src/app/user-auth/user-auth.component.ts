import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  @ViewChild('signInForm', { static: false }) signInForm: HTMLFormElement

  constructor() { }

  ngOnInit() {
  }

  signIn() {
    const { email, password } = this.signInForm.value; 
    console.log(email, password);
  }

} 
