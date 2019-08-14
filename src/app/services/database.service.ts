import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  currentUser = this.firebaseAuth.auth.currentUser;

  constructor(
    private database: AngularFirestore,
    private firebaseAuth: AngularFireAuth
  ) { }  
  
  setNickName(nickName: string) {
    return this.database.collection('users').doc(this.currentUser.uid).update({
      nickName: nickName
    });
  }

  setTheme(mode: string) {
    return this.database.collection('users').doc(this.currentUser.uid).update({
      theme: mode
    });
  }

  getUserDetails() {
    return this.database.collection('users').doc(this.currentUser.uid).valueChanges();
  }
}
