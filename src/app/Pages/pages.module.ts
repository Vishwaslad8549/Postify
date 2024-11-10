import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PostPageComponent } from './post-page/post-page.component';


@NgModule({
    declarations: [
        HomeComponent,
        PostPageComponent
    ],
    imports:[   
        NgModule,
        CommonModule
    ],
    exports:[HomeComponent,
        PostPageComponent]

})

export class PagesModule { }