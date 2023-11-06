import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { HomeComponent } from './home/home.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { HeaderComponent } from '../Components/header/header.component';
import { ContentComponent } from '../Components/content/content.component';
import { ComponentModule } from '../Components/component.module';



@NgModule({
  declarations: [ErrorComponent,FirstPageComponent,HomeComponent,SecondPageComponent],
  imports: [
    CommonModule,
    ComponentModule
  ],
  exports:[ErrorComponent,FirstPageComponent,HomeComponent,SecondPageComponent]
})
export class PageModule { }
