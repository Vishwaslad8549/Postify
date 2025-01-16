import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PostPageComponent } from './post-page/post-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsModule } from "../Components/components.module";

@NgModule({
    declarations: [
        HomeComponent,
        PostPageComponent,
        
    ],
    imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ComponentsModule
],
    exports:[
        HomeComponent,
        PostPageComponent,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,]
        

})

export class PagesModule { }