import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent, FooterDirective } from './footer/footer.component';
import { LoginComponent } from './Auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { PostCreateComponent } from './Posts/post-create/post-create.component';
import { PostListComponent } from './Posts/post-list/post-list.component';
import { DxFormModule,DxTextAreaModule,DxButtonModule,DxAccordionModule, DxFileUploaderModule} from 'devextreme-angular';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PostComponent } from './Posts/post/post.component';
import dxFileUploader from 'devextreme/ui/file_uploader';
import { SignupComponent } from './Auth/signup/signup.component';
@NgModule({
  declarations: [HeaderComponent, FooterComponent,
     LoginComponent,
     NavbarComponent,
     LogoutComponent,FooterDirective, PostCreateComponent,PostListComponent,
     PostComponent,
     SignupComponent,],
    
 
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
    DxFileUploaderModule,
    ReactiveFormsModule
  ],

  exports:[HeaderComponent, FooterComponent,
    LoginComponent,NavbarComponent,LogoutComponent,
    FooterDirective, PostCreateComponent,PostListComponent,PostComponent]
})
export class ComponentModule { }
