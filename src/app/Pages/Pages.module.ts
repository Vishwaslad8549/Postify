import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { HomeComponent } from './home/home.component';

import { ComponentModule } from '../Components/component.module';
import { ThirdPageComponent } from './third-page/third-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ErrorComponent,FirstPageComponent,HomeComponent, ThirdPageComponent],
  imports: [
    CommonModule,
    ComponentModule,
    RouterModule
  ],
  exports:[ErrorComponent,FirstPageComponent,HomeComponent]
})
export class PageModule { }
