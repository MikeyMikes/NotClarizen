import { Component, OnInit } from '@angular/core';
import { ProductBacklogService } from 'src/app/services/product-backlog.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  data:string[];

  constructor() {}

  ngOnInit() {}


}
