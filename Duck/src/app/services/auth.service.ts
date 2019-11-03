import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
  
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  signedIn:boolean;
  
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private snackBar:MatSnackBar) { 
      this.user = _firebaseAuth.authState;
      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
          }
          else {
            this.userDetails = null;
          }
        }
      );
  }

  signInWithEmailAndPassword(usernameEntry, passwordEntry){
    const promise = this._firebaseAuth.auth.signInWithEmailAndPassword(usernameEntry, passwordEntry).then(user => {
      this.signedIn = true;
    });
    promise.catch(e => {
      console.log(e.message);
      this.signedIn = false;
      this.snackBar.open('Error:', 'User not found!', {
        duration: 2000,
      });
    });
  }

  createUserWithEmailAndPassword(usernameEntry, passwordEntry){
    const promise = this._firebaseAuth.auth.createUserWithEmailAndPassword(usernameEntry, passwordEntry);
    promise.catch(e => console.log(e.message));
  }

  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }
  
  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }
  
  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }
  
  isLoggedIn() {
    if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }

}