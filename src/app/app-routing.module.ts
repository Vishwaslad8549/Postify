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
import { PostComponent } from './Components/Posts/post/post.component';
import { PostCreateComponent } from './Components/Posts/post-create/post-create.component';
import { PostListComponent } from './Components/Posts/post-list/post-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent,canActivate:[authGuard] },
  { path: 'home', component: HomeComponent,canActivate:[authGuard],
  children: [
    { path: 'create', component: PostCreateComponent },
    { path: 'edit/:id', component: PostCreateComponent},
    { path: 'list', component: PostListComponent }
  ]},

  { path: 'first', component: FirstPageComponent,canActivate:[authGuard] },
  // { path: 'post', component: PostComponent },
  {path:"todos/:id",component:TodoComponent},
  { path: 'third', component: ThirdPageComponent },
  { path: 'welcome/:user', component: WelcomeComponent },
  
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
