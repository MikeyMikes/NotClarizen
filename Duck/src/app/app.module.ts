import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { TasktableComponent } from './components/productBacklog/tasktable/tasktable.component';
import { MatTableModule, MatTooltipModule, MatSnackBarModule, MatListModule, MatSlideToggleModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { TabsComponent } from './components/tabs/tabs.component';
import { ProductBacklogButtonsComponent } from './components/productBacklog/product-backlog-buttons/product-backlog-buttons.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddTaskDialogComponent } from './components/productBacklog/add-task-dialog/add-task-dialog.component';
import {MatDialogModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSortModule} from '@angular/material';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {firebaseConfig} from '../environments/firebase.config';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LoginComponent } from './components/loginPage/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTreeModule} from '@angular/material/tree';
import {MatProgressBarModule, MatProgressBar} from '@angular/material/progress-bar';
import {ProductBacklogService} from '../app/services/product-backlog.service';
import { AuthService } from './services/auth.service';
import { SprintBacklogButtonsComponent } from './components/sprintBacklog/sprint-backlog-buttons/sprint-backlog-buttons.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddSprintDialogComponent } from './components/sprintBacklog/add-sprint-dialog/add-sprint-dialog.component';
import { ManageTeamButtonsComponent } from './components/manageTeams/manage-team-buttons/manage-team-buttons.component';
import { DatabaseConnectionService } from './services/database-connection.service';
import {SprintExpansionPanelComponent} from './components/sprintBacklog/sprint-expansion-panel/sprint-expansion-panel.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SprintBacklogService } from './services/sprint-backlog.service';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AddColumnDialogComponent } from './components/productBacklog/add-column-dialog/add-column-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TasktableComponent,
    TabsComponent,
    ProductBacklogButtonsComponent,
    AddTaskDialogComponent,
    AddColumnDialogComponent,
    ToolbarComponent,
    routingComponents,
    SprintExpansionPanelComponent,
    SprintBacklogButtonsComponent,
    AddSprintDialogComponent,
    ManageTeamButtonsComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatSortModule,
    MatTreeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [LoginComponent, ProductBacklogService, DatabaseConnectionService, AuthService, AuthGuardService, SprintBacklogService, SprintExpansionPanelComponent],
  entryComponents: [AddTaskDialogComponent, AddSprintDialogComponent, AddColumnDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
