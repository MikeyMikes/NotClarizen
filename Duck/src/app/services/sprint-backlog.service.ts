import { Injectable } from '@angular/core';

export interface Task{
  description: string;
  position: number;
  storyPoints: number;
  sprint: number;
  priority: number;
  team: string;
  taskID: number;
}

@Injectable({
  providedIn: 'root'
})
export class SprintBacklogService {

  selectedSprint:string;
  tasksForSprint:Task[] = [];
  dataSource;

  constructor() { }
}
