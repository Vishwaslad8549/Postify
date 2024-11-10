import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { PostPageComponent } from './Pages/post-page/post-page.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { PostComponent } from './Components/Posts/post/post.component';
import { PostCreateComponent } from './Components/Posts/post-create/post-create.component';
import { PostListComponent } from './Components/Posts/post-list/post-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostPageComponent,
    LoginComponent,
    SignupComponent,
    PostComponent,
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
