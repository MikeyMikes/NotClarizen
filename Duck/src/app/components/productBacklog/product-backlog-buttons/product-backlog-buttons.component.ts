import { Component, OnInit, NgModule, Input } from '@angular/core';
import { TasktableComponent } from '../tasktable/tasktable.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {AddTaskDialogComponent} from '../add-task-dialog/add-task-dialog.component';
import { ProductBacklogService } from 'src/app/services/product-backlog.service';
import { AddColumnDialogComponent } from '../add-column-dialog/add-column-dialog.component';
import { DatabaseConnectionService } from 'src/app/services/database-connection.service';

export interface TaskTable{
  description: string;
  position: number;
  storyPoints: number;
  sprint: number;
  priority: number;
  team: string;
  status: string;
  requirements: string;
  acceptanceCriteria: string;
}

export interface ColumnsToAdd{
  status:boolean;
  requirements:boolean;
  acceptanceCriteria:boolean;
  saveToProfile:boolean;
}

export interface Cols{
  columnName:string;
  show: boolean;
}

@Component({
  selector: 'app-product-backlog-buttons',
  templateUrl: './product-backlog-buttons.component.html',
  styleUrls: ['./product-backlog-buttons.component.css']
})
export class ProductBacklogButtonsComponent {

  newDescription:string;
  newStoryPoints:number;
  newSprint:number;
  newPriority:number;
  newTeam:string;
  newStatus:string;
  newRequirements:string;
  newAcceptanceCriteria:string;

  status:boolean;
  requirements:boolean;
  acceptanceCriteria:boolean;
  saveToProfile:boolean;

  constructor(private _taskTable: TasktableComponent, public dialog: MatDialog, private snackBar:MatSnackBar, private _productBacklog:ProductBacklogService,
              private _databaseConnection:DatabaseConnectionService){}
  
  openAddTaskDialog(){
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '500px',
      data: {newDescription:this.newDescription, newStoryPoints:this.newStoryPoints, 
        newSprint:this.newSprint, newPriority:this.newPriority, newTeam:this.newTeam,
        newStatus:this.newStatus, newRequirements:this.newRequirements, newAcceptanceCriteria:this.newAcceptanceCriteria}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newDescription = result.newDescription;
      this.newStoryPoints = result.newStoryPoints;
      this.newSprint = result.newSprint;
      this.newPriority = result.newPriority;
      this.newTeam = result.newTeam;
      this.newStatus = result.newStatus;
      this.newRequirements = result.newRequirements;
      this.newAcceptanceCriteria = result.newAcceptanceCriteria;
      
      this.addTask();
    });
  }

  addTask(){
    this._taskTable.addTask(this.newDescription, this.newStoryPoints, this.newSprint, this.newPriority, this.newTeam, 
                            this.newStatus, this.newRequirements, this.newAcceptanceCriteria);
  }

  removeTask(){
    this._taskTable.removeTask();
  }

  editTask(){
    var selectedTasks = this._taskTable.tasks.filter(task => (this._taskTable.selection.selected.includes(task)));
    if(selectedTasks.length == 1){
      this.newDescription = selectedTasks[0].description;
      this.newStoryPoints = selectedTasks[0].storyPoints;
      this.newSprint = selectedTasks[0].sprint;
      this.newPriority = selectedTasks[0].priority;
      this.newTeam = selectedTasks[0].team;
      this.newStatus = selectedTasks[0].status;
      this.newRequirements = selectedTasks[0].requirements;
      this.newAcceptanceCriteria = selectedTasks[0].acceptanceCriteria;
      this._taskTable.removeTask();
      this.openAddTaskDialog();
      this._productBacklog.TREE_DATA = [];
    }
    
    if(selectedTasks.length > 1){
      this.snackBar.open('Error:', 'You can only edit 1 task at a time!', {
        duration: 1000,
      });
    }
  }

  openAddColumnDialog(){
    const dialogRef = this.dialog.open(AddColumnDialogComponent, {
      width: '400px',
      data: {status:this.status, requirements:this.requirements, acceptanceCriteria:this.acceptanceCriteria}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.status = result.status;
      this.requirements = result.requirements;
      this.acceptanceCriteria = result.acceptanceCriteria;
      this.saveToProfile = result.saveToProfile;

      if(this.saveToProfile){
        var cols: Cols[] = [
           {columnName: 'status', show: this.status}, 
           {columnName: 'requirements', show: this.requirements},
           {columnName: 'acceptanceCriteria', show: this.acceptanceCriteria}
        ];
        this._databaseConnection.saveColumns(cols);
      }

      this.addColumn();      

    });
  }

  addColumn(){
    this.removeAddedColumns();
    
    if(this.status){
      if(!this._taskTable.displayedColumns.includes('status')){
        this._taskTable.displayedColumns[this._taskTable.displayedColumns.length] = 'status';
      }
    }
    if(this.requirements){
      if(!this._taskTable.displayedColumns.includes('requirements')){
        this._taskTable.displayedColumns[this._taskTable.displayedColumns.length] = 'requirements';
      }
    }
    if(this.acceptanceCriteria){
      if(!this._taskTable.displayedColumns.includes('acceptanceCriteria')){
        this._taskTable.displayedColumns[this._taskTable.displayedColumns.length] = 'acceptanceCriteria';
      }
    }
  }

  removeAddedColumns(){
    var additionalColumns = ['status', 'requirements', 'acceptanceCriteria']

    for(let col of additionalColumns){
      const index = this._taskTable.displayedColumns.indexOf(col, 0);
      if (index > -1)
        this._taskTable.displayedColumns.splice(index, 1);
    }
  }

}
