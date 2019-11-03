import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TasktableComponent} from '../tasktable/tasktable.component';
import {FormControl, Validators} from '@angular/forms';
import { ProductBacklogService } from 'src/app/services/product-backlog.service';

export interface TaskTable{
  newDescription:string;
  newPosition:number;
  newStoryPoints:number;
  newSprint:number;
  newPriority:number;
  newTeam:string;
  newStatus:string;
  newRequirements:string;
  newAcceptanceCriteria:string;
}

export interface Food {
  value: string;
  viewValue: string;
}

export interface Status {
  value: string;
  viewValue: string;
}

export interface Sprint{
  value: string;
  viewValue?: string;
}

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent implements OnInit{

  descriptionFormControl = new FormControl('', [
    Validators.required,
  ]);
  storyPointsFormControl = new FormControl('', [
    Validators.required,
  ]);
  sprintFormControl = new FormControl('', [
    Validators.required,
  ]);
  priorityFormControl = new FormControl('', [
    Validators.required,
  ]);
  teamFormControl = new FormControl('', [
    Validators.required,
  ]);

  tt:TaskTable;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  statuses: Status[] = [
    {value: 'Submitted', viewValue: 'Submitted'},
    {value: 'Added to Sprint', viewValue: 'Added to Sprint'},
    {value: 'In Progress', viewValue: 'In Progress'},
    {value: 'Done', viewValue: 'Done'}
  ];

  sprints:string[] = [];

  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>, private _productBacklog:ProductBacklogService,
    @Inject(MAT_DIALOG_DATA) public data: TaskTable) { }

  ngOnInit(){
    this.sprints = this._productBacklog.availableSprints;
    this.sprints[this.sprints.length] = 'None';
    this.sprints = this.sprints.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  getTaskInfo(){
    this.tt = {newDescription: this.data.newDescription, newPosition: this.data.newPosition, newStoryPoints: this.data.newStoryPoints, newSprint: this.data.newSprint,
    newPriority: this.data.newPriority, newTeam: this.data.newTeam, newStatus: this.data.newStatus, newRequirements: this.data.newRequirements, 
    newAcceptanceCriteria: this.data.newAcceptanceCriteria};
    return this.tt;
  }

}
