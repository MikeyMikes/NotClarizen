import { Component, OnInit, Injectable } from '@angular/core';
import { ProductBacklogService } from 'src/app/services/product-backlog.service';
import { SprintBacklogService } from 'src/app/services/sprint-backlog.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

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

@Component({
  selector: 'app-sprint-expansion-panel',
  templateUrl: './sprint-expansion-panel.component.html',
  styleUrls: ['./sprint-expansion-panel.component.css']
})
@Injectable()
export class SprintExpansionPanelComponent implements OnInit {

  displayedColumns: string[] = ['description', 'storyPoints', 'sprint', 'priority', 'team'];
  panels: SprintNode[] = [];
  selectedSprint:string;

  constructor(private _productBacklog:ProductBacklogService, private _sprintBacklog:SprintBacklogService) {
    this.loadSprints();
    this._sprintBacklog.dataSource = _sprintBacklog.tasksForSprint;
  }

  ngOnInit() {
    this.loadSprints();
    this._sprintBacklog.dataSource = this._sprintBacklog.tasksForSprint;
  }

  loadSprints() {
    this.resolveAfter1000Mills(this._productBacklog.TREE_DATA).then(value => {
      this.panels = this._productBacklog.TREE_DATA;
      for(let sprint of this.panels){
        for(let task of sprint.children){
          if(sprint.name == task.sprint.toString()){
            if(!this._sprintBacklog.tasksForSprint.includes(task)){
              this._sprintBacklog.tasksForSprint[this._sprintBacklog.tasksForSprint.length] = task;
            }
          }
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

  setPanel(panel){
    this.selectedSprint = panel.name;
    this._sprintBacklog.selectedSprint = this.selectedSprint;
  }

  tasksForPanel(){
    let arr:Task[] = [];
    for(let task of this._sprintBacklog.tasksForSprint){
      if(task.sprint.toString() == this.selectedSprint){
        arr[arr.length] = task;
      }
    }
    return arr;
  }

}
