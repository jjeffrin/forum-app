import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  session: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkUserSession();
  }

  checkUserSession() {
    this.authService.checkSession().subscribe(user => {
      if (user) {
        this.session = true;
      }
      else {
        this.session = false;
      }
    });

  }

  signOut() {
    this.authService.signOut();
    this.checkUserSession();
    this.router.navigate(['/user-auth']);
  }

}
