import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './Components/component.module';
import { PageModule } from './Pages/Pages.module';
import { DxButtonModule } from 'devextreme-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentModule,
    PageModule,
    DxButtonModule,
    BrowserAnimationsModule

   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
