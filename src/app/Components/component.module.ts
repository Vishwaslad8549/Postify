import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent, FooterDirective } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { ListTodoComponent } from './list-todo/todo.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component';
import { PostCreateComponent } from './Posts/post-create/post-create.component';
import { PostListComponent } from './Posts/post-list/post-list.component';
import { DxFormModule,DxTextAreaModule,DxButtonModule,DxAccordionModule} from 'devextreme-angular';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PostComponent } from './Posts/post/post.component';
@NgModule({
  declarations: [HeaderComponent, FooterComponent,ContentComponent, ListTodoComponent,
     LoginComponent, WelcomeComponent,FormComponent,
     NavbarComponent,
     LogoutComponent,FooterDirective, TodoComponent, PostCreateComponent,PostListComponent,
     PostComponent],
    
 
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FormsModule,
    DxFormModule,
    DxTextAreaModule,
    DxButtonModule,
    DxAccordionModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    DxAccordionModule,
  ],

  exports:[HeaderComponent, FooterComponent,ContentComponent,ListTodoComponent,
    LoginComponent,FormComponent,NavbarComponent,WelcomeComponent,LogoutComponent,
    FooterDirective, PostCreateComponent,PostListComponent,PostComponent]
})
export class ComponentModule { }
