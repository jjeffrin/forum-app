import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  @ViewChild('signInForm', { static: false }) signInForm: HTMLFormElement;
  @ViewChild('signUpForm', { static: false }) signUpForm: HTMLFormElement;
  loginErrorMessage: string;
  regErrorMessage: string;
  loginLoading: boolean = false;
  regLoading: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.loginLoading = true;
    const { email, password } = this.signInForm.value; 
    this.authService.signIn(email, password).then(
      () => {
        if(this.authService.currentUser().emailVerified) {
          this.router.navigate(['/user-profile']);
        } else {
          this.loginLoading = false;
          this.authService.signOut();
          this.loginErrorMessage = "Please verify your email ID by clicking the link in the Email you have received from our team.";
        }        
      }
    ).catch(
      () => {
        this.loginLoading = false;
        this.loginErrorMessage = "Invalid user credentials. Please try again.";
      }
    )
  }

  signUp() {
    this.regLoading = true;
    const { email, password } = this.signUpForm.value;
    this.authService.signUp(email, password).then(
      () => {
        this.authService.currentUser().sendEmailVerification().then(
          () => {
            this.authService.signOut();
            this.regLoading = false;            
            this.router.navigate(['/verification-sent']);
          }
        )
      }
    ).catch(
      () => {
        this.regLoading = false;
        this.regErrorMessage = "User registration failed. Please try again.";
      }
    )
  }

  resetRegForm() {
    this.signUpForm.reset();
  }

} 
