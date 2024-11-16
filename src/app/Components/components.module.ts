import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { PostComponent } from './Posts/post/post.component';
import { PostCreateComponent } from './Posts/post-create/post-create.component';
import { PostListComponent } from './Posts/post-list/post-list.component';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
    declarations: 
    [   LoginComponent,
        SignupComponent,
        PostComponent,
        PostCreateComponent,
        PostListComponent,
        NavbarComponent               
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
        PostComponent,
        PostCreateComponent,
        PostListComponent,
        NavbarComponent
         ]

})

export class ComponentsModule { }