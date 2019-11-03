import { Component, OnInit, Injectable, ElementRef, ViewChild } from '@angular/core';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  newUsernameEntry:string;
  newPasswordEntry:string;
  newPasswordConfirmationEntry:string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  passwordConfirmFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private _authService:AuthService, private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit() {}

  @ViewChild('newPassword') newPasswordEntryField: ElementRef;
  createUserWithEmailAndPassword(){
    if(this.newPasswordEntry == this.newPasswordConfirmationEntry){
      this._authService.createUserWithEmailAndPassword(this.newUsernameEntry, this.newPasswordEntry);
      this.snackBar.open('Success:', 'Account Created!', {
        duration: 2000,
      });
      this.router.navigate(['']);
    }
    else{
      this.snackBar.open('Error:', 'Passwords must match!', {
        duration: 2000,
      });
      this.newPasswordEntry = "";
      this.newPasswordConfirmationEntry = "";
      this.newPasswordEntryField.nativeElement.focus();
    }
  }

}
