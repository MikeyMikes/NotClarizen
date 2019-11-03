import { Component, OnInit, Inject } from '@angular/core';
import { ColumnsToAdd } from '../product-backlog-buttons/product-backlog-buttons.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductBacklogService } from 'src/app/services/product-backlog.service';

export interface ColumnsToAdd{
  status:boolean;
  requirements:boolean;
  acceptanceCriteria:boolean;
  saveToProfile:boolean;
}

@Component({
  selector: 'app-add-column-dialog',
  templateUrl: './add-column-dialog.component.html',
  styleUrls: ['./add-column-dialog.component.css']
})
export class AddColumnDialogComponent implements OnInit {

  columns:ColumnsToAdd;
  status = false;
  requirements = false;
  acceptanceCriteria = false;
  saveToProfile = false;

  constructor(public dialogRef: MatDialogRef<AddColumnDialogComponent>, private _productBacklog:ProductBacklogService,
    @Inject(MAT_DIALOG_DATA) public data: ColumnsToAdd) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getColumnInfo(){
    this.columns = { status: this.data.status, requirements: this.data.requirements, acceptanceCriteria: this.data.acceptanceCriteria,
                    saveToProfile: this.data.saveToProfile};

    return this.columns;
  }

}
