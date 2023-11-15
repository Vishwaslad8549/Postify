import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router'


@NgModule({
  declarations: [HeaderComponent, FooterComponent,ContentComponent, TodoComponent,
     LoginComponent, WelcomeComponent,FormComponent,
     NavbarComponent,],
 
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[HeaderComponent, FooterComponent,ContentComponent,TodoComponent,
    LoginComponent,FormComponent,NavbarComponent,WelcomeComponent]
})
export class ComponentModule { }
