import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

export interface Sprint{
  newSprint:string;
}

@Component({
  selector: 'app-add-sprint-dialog',
  templateUrl: './add-sprint-dialog.component.html',
  styleUrls: ['./add-sprint-dialog.component.css']
})
export class AddSprintDialogComponent implements OnInit {

  descriptionFormControl = new FormControl('', [
    Validators.required
  ]);

  s:Sprint;
  
  constructor(public dialogRef: MatDialogRef<AddSprintDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Sprint) { }

  ngOnInit() {}

  getSprintInfo(){
    this.s = {newSprint:this.data.newSprint};
    return this.s;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
