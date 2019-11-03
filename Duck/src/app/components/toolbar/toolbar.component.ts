import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { LoginComponent } from '../loginPage/login/login.component';
import { ProductBacklogService } from 'src/app/services/product-backlog.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  title:string;

  constructor(private loginComp: LoginComponent, private af:AngularFireAuth, private _productBacklog:ProductBacklogService, private _authService:AuthService) { 
    this.title = this._authService.userDetails.email;
  }

  ngOnInit() {}

  signOut(){
    this._productBacklog.TREE_DATA = [];
    this._productBacklog.availableSprints = [];
    this.loginComp.signOut();
  }

  resolveAfter1000Mills(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 1000);
    });
  }

}
