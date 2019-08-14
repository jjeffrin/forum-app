import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private database: AngularFirestore
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

  isUserPresentInDatabase() {    
    return this.database.collection('users').doc(this.currentUser().uid).get();
  }

  createDatabaseRecordForUser() {
    return this.database.collection('users').doc(this.currentUser().uid).set({
      email: this.currentUser().email,
      theme: 'light'
    });
  }

}
