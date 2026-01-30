import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { HomeComponent } from './Pages/home/home.component';
import { PostCreateComponent } from './Components/Posts/post-create/post-create.component';
import { PostListComponent } from './Components/Posts/post-list/post-list.component';
import { AuthGuard } from './guards/auth.guard';
import { PostPageComponent } from './Pages/post-page/post-page.component';
const routes: Routes = [
   { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {path:"signup",component:SignupComponent},
  { path: 'logout', component: LoginComponent,canActivate:[AuthGuard] },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  {path:'post',component:PostPageComponent,canActivate:[AuthGuard],
    children: [
      { path: 'create', component: PostCreateComponent },
      { path: 'edit/:id', component: PostCreateComponent},
      { path: 'list', component: PostListComponent }
    ]
  },
  { path: '**', redirectTo: 'home' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
