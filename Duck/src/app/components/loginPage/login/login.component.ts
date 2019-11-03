import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HomeComponent } from '../../home/home.component';
import { TasktableComponent } from '../../productBacklog/tasktable/tasktable.component';
import { AuthService } from 'src/app/services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameEntry:string;
  passwordEntry:string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private af:AngularFireAuth, private _auth:AuthService) {}

  ngOnInit() {}

  signInWithEmailAndPassword(){
    this._auth.signInWithEmailAndPassword(this.usernameEntry, this.passwordEntry);
  } 
  
  createUserWithEmailAndPassword(){
    this._auth.createUserWithEmailAndPassword(this.usernameEntry, this.passwordEntry);
  }

  signInWithGoogle(){
    this._auth.signInWithGoogle();
  }

  signOut(){
    this.af.auth.signOut();
  }

}
