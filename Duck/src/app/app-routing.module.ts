import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/loginPage/login/login.component';
import { HomeComponent} from './components/home/home.component'
import { AuthGuardService } from './services/auth-guard.service';
import { CreateAccountComponent } from './components/create-account/create-account.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {path: 'createAccount', component: CreateAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent]