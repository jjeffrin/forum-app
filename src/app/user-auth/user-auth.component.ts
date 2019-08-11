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
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.loading = true;
    const { email, password } = this.signInForm.value; 
    this.authService.signIn(email, password).then(
      () => {
        if(this.authService.currentUser().emailVerified) {
          this.router.navigate(['/user-profile']);
        } else {
          this.loading = false;
          this.authService.signOut();
          this.loginErrorMessage = "Please verify your email ID by clicking the link in the Email you have received from our team.";
        }        
      }
    ).catch(
      () => {
        this.loading = false;
        this.loginErrorMessage = "Invalid user credentials. Please try again.";
      }
    )
  }

  signUp() {
    const { email, password, rePassword } = this.signUpForm.value;
    this.authService.signUp(email, password).then(
      () => {
        this.authService.currentUser().sendEmailVerification().then(
          () => {
            console.log("send");
            this.router.navigate(['/verification-send']);
          }
        )
      }
    ).catch(
      () => {
        console.log("catch");
        this.regErrorMessage = "User registration failed. Please try again.";
      }
    )
  }

  resetRegForm() {
    this.signUpForm.reset();
  }

} 
