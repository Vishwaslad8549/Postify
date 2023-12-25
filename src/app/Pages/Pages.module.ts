import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { HomeComponent } from './home/home.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ComponentModule } from '../Components/component.module';
import { ThirdPageComponent } from './third-page/third-page.component';
import { PostComponent } from './post/post.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ErrorComponent,FirstPageComponent,HomeComponent,SecondPageComponent, ThirdPageComponent, PostComponent],
  imports: [
    CommonModule,
    ComponentModule,
    RouterModule
  ],
  exports:[ErrorComponent,FirstPageComponent,HomeComponent,SecondPageComponent]
})
export class PageModule { }
