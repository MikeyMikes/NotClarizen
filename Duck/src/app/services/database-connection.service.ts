import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

export interface Cols{
  columnName:string;
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectionService {

  constructor(public db:AngularFireDatabase, private af:AngularFireAuth, private _authService:AuthService) { }

  addSprint(sprintNumber){
    var sprintRef = firebase.database().ref('/Users/' + this._authService.userDetails.uid + '/sprints/').child(sprintNumber+"");
    sprintRef.set({description: sprintNumber});
  }

  deleteSprint(sprintNumber){
    var sprintRef = firebase.database().ref('/Users/' + this._authService.userDetails.uid + '/sprints/').child(sprintNumber+"");
    sprintRef.set(null);
  }

  saveColumns(columns:Cols[]){
    for(let column of columns){
      var columnRef = firebase.database().ref('/Users/' + this._authService.userDetails.uid + '/columns/').child(column.columnName);
      if(column.show)
        columnRef.set({description: column.columnName});
      else
        columnRef.set({description: ""});
    }
  }

}
