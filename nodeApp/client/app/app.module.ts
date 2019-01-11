import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './components/app.component';
import  {DisplayPostComponent} from "./components/displayPost.component";
import {AppNavBar} from "./components/appNavBar.component"
import {GoogleSigninComponent} from "./components/googleSignIn.component"
import { PostComponent } from './components/post.component';
import { EditPostComponent } from './components/editPost.component';
import { CommentComponent } from './components/comment.component';
import { PostListComponent } from './components/postList.component';
import { PostDetailComponent } from './components/postDetail.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { ServerService } from './server/server.service';
@NgModule({
    imports: [
        BrowserModule,
        BootstrapModalModule,
        FormsModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [AppComponent, DisplayPostComponent, AppNavBar, GoogleSigninComponent, PostComponent, EditPostComponent, CommentComponent, PostDetailComponent, PostListComponent],
    entryComponents: [
        PostComponent,
        EditPostComponent,
        CommentComponent
    ],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}, ServerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
