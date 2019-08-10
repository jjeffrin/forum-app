import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  @ViewChild('signInForm', { static: false }) signInForm: HTMLFormElement
  errorMessage: string;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    console.log("called");
    this.loading = true;
    console.log(this.loading);
    const { email, password } = this.signInForm.value; 
    this.authService.signIn(email, password).then(
      () => {
        this.router.navigate(['/user-profile']);
      }
    ).catch(
      () => {
        this.loading = false;
        this.errorMessage = "Invalid user credentials. Please try again.";
      }
    )
  }

} 
