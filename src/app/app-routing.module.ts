import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { FirstPageComponent } from './Pages/first-page/first-page.component';
import { SecondPageComponent } from './Pages/second-page/second-page.component';
import { ErrorComponent } from './Pages/error/error.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'first', component: FirstPageComponent },
  { path: 'second', component: SecondPageComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
