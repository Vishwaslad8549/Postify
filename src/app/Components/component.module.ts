import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { TodoComponent } from './todo/todo.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent,ContentComponent, TodoComponent],
 
  imports: [
    CommonModule
  ],
  exports:[HeaderComponent, FooterComponent,ContentComponent,TodoComponent]
})
export class ComponentModule { }
