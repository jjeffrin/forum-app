import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth
  ) { }

  checkSession() {
    return this.firebaseAuth.authState;
  }

  currentUser() {
    return this.firebaseAuth.auth.currentUser;
  }

  signIn(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
  
  signOut() {
    return this.firebaseAuth.auth.signOut();
  }

  signUp(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  passwordResetLink(email: string) {
    return this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }
}
