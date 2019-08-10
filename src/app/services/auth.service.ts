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

  signIn(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
  
  signOut() {
    return this.firebaseAuth.auth.signOut();
  }
}
