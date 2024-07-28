import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { FirstPageComponent } from './Pages/first-page/first-page.component';
import { ThirdPageComponent } from './Pages/third-page/third-page.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { AuthGuard } from './Guards/auth.guard';

import { PostCreateComponent } from './Components/Posts/post-create/post-create.component';
import { PostListComponent } from './Components/Posts/post-list/post-list.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {path:"signup",component:SignupComponent},
  { path: 'logout', component: LoginComponent,canActivate:[AuthGuard] },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard],
  children: [
    { path: 'create', component: PostCreateComponent },
    { path: 'edit/:id', component: PostCreateComponent},
    { path: 'list', component: PostListComponent }
  ]},

  { path: 'first', component: FirstPageComponent,canActivate:[AuthGuard] },
  // { path: 'post', component: PostComponent },
  { path: 'third', component: ThirdPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
