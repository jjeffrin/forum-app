import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string;
  successMessage: string;
  errorMessage: string;

  constructor(
    private router: Router,
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
    console.log("send");
    this.authService.passwordResetLink(this.email).then(
      () => {
        this.successMessage = "Password reset mail is sent to the above mentioned mail. Click on the link in the mail to reset your password and then login again.";
      }
    ).catch(
      () => {
        this.errorMessage = "Something went wrong. Please try again.";
      }
    );
  }

}
