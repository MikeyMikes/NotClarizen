import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddSprintDialogComponent } from '../add-sprint-dialog/add-sprint-dialog.component';
import { FormControl, Validators } from '@angular/forms';
import { ProductBacklogService } from 'src/app/services/product-backlog.service';
import { DatabaseConnectionService } from 'src/app/services/database-connection.service';
import { SprintBacklogService } from 'src/app/services/sprint-backlog.service';

interface SprintNode {
  name: string;
  children?: SprintNode[];
}

@Component({
  selector: 'app-sprint-backlog-buttons',
  templateUrl: './sprint-backlog-buttons.component.html',
  styleUrls: ['./sprint-backlog-buttons.component.css']
})
export class SprintBacklogButtonsComponent implements OnInit {

  newSprint:string;
  
  constructor(private dialog:MatDialog, private _productBacklog:ProductBacklogService, private _sprintBacklog:SprintBacklogService,
    private _databaseConnection:DatabaseConnectionService) { }

  ngOnInit() {}

  openDialog(){
    const dialogRef = this.dialog.open(AddSprintDialogComponent, {
      width: '500px',
      data: {newSprint:this.newSprint}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newSprint = result.newSprint;
      this._productBacklog.TREE_DATA[this._productBacklog.TREE_DATA.length] = { name: this.newSprint };
      this._databaseConnection.addSprint(this.newSprint);
      this._productBacklog.TREE_DATA = [];
    });

  }

  deleteSprint(){
    this._productBacklog.TREE_DATA = [];
    this._databaseConnection.deleteSprint(this._sprintBacklog.selectedSprint);
    window.location.reload();
  }

}
