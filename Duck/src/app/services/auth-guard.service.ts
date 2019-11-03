import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FirebaseAuth } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { catchError} from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authService: AuthService, private af: AngularFireAuth, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    return this.af.authState
       .pipe(take(1))
       .pipe(map(user => !!user))
       .pipe(tap(loggedIn => {
         if (!loggedIn) {
           console.log("access denied")
           this._router.navigate(['/login']);
         }
     }))
  }  
}
