import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PostPageComponent } from './post-page/post-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        HomeComponent,
        PostPageComponent
    ],
    imports:[   
        
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    exports:[HomeComponent,
        PostPageComponent]

})

export class PagesModule { }