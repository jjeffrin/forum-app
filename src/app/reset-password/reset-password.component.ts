import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('form', { static: false }) formData: HTMLFormElement;
  email: string;
  successMessage: string;
  errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      param => {
        this.email = param['email'];
        console.log(param['email']);
      }
    )
  }

  sendPasswordResetLink() {
    if (this.formData.valid) {
      this.authService.passwordResetLink(this.email).then(
        () => {
          this.errorMessage = '';
          this.successMessage = "Password reset mail is sent to the above mentioned mail. Click on the link in the mail to reset your password and then login again.";
        }
      ).catch(
        () => {
          console.log('err')
          this.successMessage = '';
          this.errorMessage = "Something went wrong. Please try again.";
        }
      );
    } else {
      this.successMessage = '';
      this.errorMessage = "Please enter a valid email Id.";
    }
  }
}
