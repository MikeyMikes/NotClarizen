import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList, AngularFireObject, PathReference} from 'angularfire2/database';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { TasktableComponent } from 'src/app/components/productBacklog/tasktable/tasktable.component';

interface SprintNode {
  name: string;
  children?: Task[];
}

export interface Task{
  description: string;
  position: number;
  storyPoints: number;
  sprint: number;
  priority: number;
  team: string;
  taskID: number;
}

interface Sprint{
  value: string;
  viewValue?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductBacklogService {

  constructor(public db:AngularFireDatabase, private af:AngularFireAuth, private _authService:AuthService) { }

  storedSprints$ : AngularFireList<any>;
  storedTasksForSprint$ : AngularFireList<any>;
  storedColumns$ : AngularFireList<any>;
  availableSprints:string[] = [];

  TREE_DATA: SprintNode[] = [];

  test:SprintNode;
  tasks:Task[] = [];
  savedColumns:string[] = [];

  getRef(){
    this.af.authState.subscribe(firebaseUser => {
      if(firebaseUser){
        return firebase.database().ref('/Users/' + firebaseUser.uid + '/tasks/');
      }else{
        console.log('not logged in');
      }
    })
  }

  setAdditionalColumns(){
    this.af.authState.subscribe(firebaseUser =>{
      this.storedColumns$ = this.db.list(firebase.database().ref('/Users/' + firebaseUser.uid + '/columns/'));
    
      this.storedColumns$.valueChanges().subscribe(column =>{
        column.forEach(item => {
          this.savedColumns[this.savedColumns.length] = item.description;
        })
      });
    })
  }

  setAvailableSprints(){
    this.af.authState.subscribe(firebaseUser =>{
      this.storedSprints$ = this.db.list(firebase.database().ref('/Users/' + firebaseUser.uid + '/sprints/'));
    
      this.storedSprints$.valueChanges().subscribe(sprint =>{
        sprint.forEach(item => {
          this.setSprintInfo(item.description);
          if(!this.availableSprints.includes(item.description)){
            this.availableSprints.push(item.description);
          }
        })
      });
    })
  }

  setSprintInfo(sprintNumber){
    this.storedTasksForSprint$ = this.db.list(firebase.database().ref('Users/' + this._authService.userDetails.uid + '/tasks/'));
    this.storedTasksForSprint$.valueChanges().subscribe(user =>{
      user.forEach(tsk => {
        if(tsk.sprint == sprintNumber && !this.tasks.includes(tsk.description)){
          this.tasks.push(tsk);
        }
      })
      this.test = { name: sprintNumber, children:[  ] };

      for(let task of this.tasks){
        let taskSprintNode:Task = {description:task.description, position:task.position, storyPoints:task.storyPoints, 
          sprint:task.sprint, priority:task.priority, team:task.team, taskID:task.taskID};
        if(taskSprintNode.description != ""){
          this.test.children[this.test.children.length] = taskSprintNode;
        }
      }

      this.TREE_DATA[this.TREE_DATA.length] = this.test;
      this.tasks = [];
    })
  }
  
}