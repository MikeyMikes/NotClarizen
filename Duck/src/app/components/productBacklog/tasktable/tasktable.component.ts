import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatTab, MatSort, MatPaginator } from '@angular/material';
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {tap} from "rxjs/operators";
import { ProductBacklogService } from 'src/app/services/product-backlog.service';
import { SprintBacklogService } from 'src/app/services/sprint-backlog.service';
import { SprintExpansionPanelComponent } from 'src/app/components/sprintBacklog/sprint-expansion-panel/sprint-expansion-panel.component';

export interface TaskTable{
  description: string;
  position: number;
  storyPoints: number;
  sprint: number;
  priority: number;
  team: string;
  taskID: number;
  status: string;
  requirements: string;
  acceptanceCriteria: string;
}

@Component({
  selector: 'tasktable',
  templateUrl: './tasktable.component.html',
  styleUrls: ['./tasktable.component.css']
})

@Injectable()
export class TasktableComponent implements OnInit, CanActivate{

  storedTasks$ : AngularFireList<any>;
  taskIDs : number[] = [];
  taskID: number;
  ref;

  constructor(private db:AngularFireDatabase, private af:AngularFireAuth, private router:Router, private _productBacklog:ProductBacklogService,
              private sprintExapansionPanel:SprintExpansionPanelComponent){
    this.setRef();
  }

  setRef(){
    this.af.authState.subscribe(firebaseUser => {
      if(firebaseUser){
        this.ref = firebase.database().ref('/Users/' + firebaseUser.uid + '/tasks/');
      }else{
        console.log('not logged in');
      }
    })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(){
    this.setAdditionalColumns();
    this.loadTasks();
    console.log('tasks loaded');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  tasks: TaskTable[] = [];
  newTask:TaskTable;

  displayedColumns: string[] = ['select', 'description', 'storyPoints', 'sprint', 'priority', 'team'];
  dataSource = new MatTableDataSource(this.tasks);
  selection = new SelectionModel<TaskTable>(true, []);
  hidden = false;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadTasks() {
    this.resolveAfter1000Mills(this.setRef()).then(value => {
      this.storedTasks$ = this.db.list(this.ref);
      this.storedTasks$.valueChanges().subscribe(user =>{
        user.forEach(item => {
          this.showTasks(item.description, item.storypoints, item.sprint, item.priority, item.team, item.taskID,
                        item.status, item.requirements, item.acceptanceCriteria);
        })
      });
    })

    this._productBacklog.setAvailableSprints();
  }

  setAdditionalColumns(){
    this._productBacklog.setAdditionalColumns();

    this.resolveAfter1000Mills(this._productBacklog.savedColumns).then(value => {
      for(let col of this._productBacklog.savedColumns){
        if(col != "" && !this.displayedColumns.includes(col)){
          this.displayedColumns[this.displayedColumns.length] = col;
        }
      }
    })
  }

  resolveAfter1000Mills(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 1000);
    });
  }

  showTasks(newDescription:string, newStoryPoints:number, newSprint:number, newPriority:number, newTeam:string, newTaskID:number, newStatus:string,
            newRequirements:string, newAcceptanceCriteria:string){
    this.newTask = { description:newDescription, position:this.dataSource.data.length+1, storyPoints:newStoryPoints, sprint:newSprint,
    priority:newPriority, team:newTeam, taskID:newTaskID, status:newStatus, requirements:newRequirements, acceptanceCriteria:newAcceptanceCriteria };
    
    if(!this.taskIDs.includes(newTaskID)){
      this.tasks.push(this.newTask);
      this.taskIDs.push(newTaskID);
      this.dataSource.data = this.tasks;
    }
    
  }

  addTask(newDescription:string, newStoryPoints:number, newSprint:number, newPriority:number, newTeam:string, 
          newStatus:string, newRequirements:string, newAcceptanceCriteria:string){
    do{
      this.taskID = Math.floor(Math.random() * 10000) + 1;
    }while(this.taskIDs.indexOf(this.taskID) > -1);
    
    var taskRef = this.ref.child(this.taskID + "");

    newStatus = (newStatus == null) ? '' : newStatus;
    newRequirements = (newRequirements == null) ? '' : newRequirements;
    newAcceptanceCriteria = (newAcceptanceCriteria == null) ? '' : newAcceptanceCriteria;

    taskRef.set({description: newDescription, storypoints: newStoryPoints, sprint: newSprint, priority: newPriority, team: newTeam, taskID: this.taskID,
                status: newStatus, requirements: newRequirements, acceptanceCriteria: newAcceptanceCriteria});
    this.dataSource.data = this.tasks;
    
    this._productBacklog.TREE_DATA = [];
  }

  removeTask(){
    let tasksToRemove = this.tasks.filter(task => (this.selection.selected.includes(task)));
    let removableIDs = [];

    for(let task of tasksToRemove){
      removableIDs.push(task.taskID);
    }

    for(let task of tasksToRemove){
      this.storedTasks$.valueChanges().subscribe(user =>{
        user.forEach(item => {
          if(removableIDs.indexOf(item.taskID) > -1){
            var ref = this.ref.child(item.taskID + "");
            ref.set(null);
          }
        })
      });
    }
 
    this.tasks = this.tasks.filter(task => (!this.selection.selected.includes(task)));
    this.selection.clear();
    this.dataSource.data = this.tasks;
    this.dataSource.sort = this.sort;
    this._productBacklog.TREE_DATA = [];
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: TaskTable): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.af.authState
       .pipe(take(1))
       .pipe(map(user => !!user))
       .pipe(tap(loggedIn => {
         if (!loggedIn) {
           console.log("access denied")
           this.router.navigate(['/login']);
         }
     }))
   }

}
