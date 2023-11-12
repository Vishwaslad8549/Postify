import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './Components/component.module';
import { PageModule } from './Pages/Pages.module';


@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentModule,
    PageModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
