import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { PostCreateComponent } from './Posts/post-create/post-create.component';
import { PostListComponent } from './Posts/post-list/post-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PopupComponent } from './reusable/popup/popup.component';



@NgModule({
    declarations: 
    [   LoginComponent,
        SignupComponent,
        PostCreateComponent,
        PostListComponent,
        NavbarComponent,
        FooterComponent,
        PopupComponent               
    ],
    imports:[
        
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule

         ],
    exports:[
        LoginComponent,
        SignupComponent,
        PostCreateComponent,
        PostListComponent,
        NavbarComponent,
        FooterComponent]
})

export class ComponentsModule { }