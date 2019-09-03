import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  currentUser: any;
  uid: string;

  constructor(
    private database: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    private authService: AuthService
  ) { 
    // this.firebaseAuth.authState.subscribe(
    //   data => {
    //     this.currentUser = data;
    //     console.log(this.currentUser.uid);
    //   }
    // );
    this.authService.checkSession().subscribe(
      (user) => {
        if (user) {
        console.log(user.uid);  
        this.currentUser = user;
        }
      }
    );
  }  
  
  setNickName(nickName: string) {
    return this.database.collection('users').doc(this.currentUser.uid).update({
      nickName: nickName
    });
  }

  setTheme(mode: string, uid: string) {
    console.log('service uid: ', uid);
    return this.database.collection('users').doc(uid).update({
      theme: mode
    });
  }

  getUserDetails(uid) {
    //  this.authService.checkSession().subscribe(
    //   user => {
    //     if (user) {
    //       this.uid = user.uid;
    //     }
    //   }
    // );
    return this.database.collection('users').doc(uid).valueChanges();
  }
}
