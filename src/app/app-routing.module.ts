import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { FirstPageComponent } from './Pages/first-page/first-page.component';
import { SecondPageComponent } from './Pages/second-page/second-page.component';
import { ErrorComponent } from './Pages/error/error.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { ThirdPageComponent } from './Pages/third-page/third-page.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './Guards/auth.guard';
import { LogoutComponent } from './Components/logout/logout.component';
import { TodoComponent } from './Components/todo/todo.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent,canActivate:[authGuard] },
  { path: 'first', component: FirstPageComponent },
  { path: 'second', component: SecondPageComponent },
  {path:"todos/:id",component:TodoComponent},
  { path: 'third', component: ThirdPageComponent },
  { path: 'welcome/:user', component: WelcomeComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
