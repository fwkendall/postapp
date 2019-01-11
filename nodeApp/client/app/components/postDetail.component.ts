import { Component,Input, AfterContentInit, NgZone } from '@angular/core';
import { DialogService } from "ng2-bootstrap-modal"
import { EditPostComponent } from "./editPost.component"
import { CommentComponent } from "./comment.component"
import { Post } from "../models/post";
import { Response } from '@angular/http';
import { ServerService } from '../server/server.service';
import UserService from "../services/user.service"
import { ActivatedRoute } from '@angular/router';
import Store from "../services/store.service"
import Remote from "../services/remote.service"
declare const location:any;
@Component({
    selector: "post-detail",
    templateUrl: "./postDetail.component.html",
    styleUrls:['./app.component.css'],
    providers: [DialogService]
})

export class PostDetailComponent implements AfterContentInit{
    isLogin: boolean = false;
    isAuthor: boolean = false;    
    posts: Post[];
    ngAfterContentInit() {
        // contentChild is set after the content has been initialized
        this.fetch();

    }
    constructor(private serverService: ServerService, private route:ActivatedRoute, private dialogService: DialogService, private zone:NgZone) {}
    checkIsAuthor(post) {
        let user = UserService.getUser();
        if(user && user.id === post.userId) {
            this.isAuthor = true;
        }
    }
    fetch() {
        const self = this;
        this.route.params.subscribe(params => {
            // console.log('pp:',params) //log the entire params object
            // console.log(params['pid']) //log the value of id
        this.serverService.getPost(params.id)
            .subscribe(
                (response: Response) => {
                    // this.posts.push(response.json);
                    console.log('detail:', response);
                    this.posts = [response];

                    this.checkIsAuthor(response);
                },
                (error) => console.log(error)
            );
        });
    }
    editPost() {
        var self = this;
        const p = self.posts[0];
        
        let disposable = this.dialogService.addDialog(EditPostComponent, {
                title:'Edit Post',
                message:'',
                passTitle: p.title,
                passBody: p.body,
                passPostId: p._id
            })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    let post = Store.newPost;
                    // console.log('edit post:', post);
                    if (post) {
                        Remote.updatePost(p._id, post).then((resp) => {
                            self.zone.run(() => {
                                // self.didPost.emit(post);
                                self.fetch();
                            });
                        });
                    }
                }
            });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout

    }
    addComment() { 
        let user = UserService.getUser();
        if(!user){
            alert('Please Log in');
            return;
        }       
        var self = this;
        const p = self.posts[0];        
        let disposable = this.dialogService.addDialog(CommentComponent, {
                title:'Add Comment',
                message:'',
            })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    let comment = Store.newComment;
                    // console.log('edit post:', post);
                    if (comment) {
                        console.log('comm:', comment);
                        Remote.addComment(p._id, comment).then((resp) => {
                            self.zone.run(() => {                                
                                // self.didPost.emit(post);
                                self.fetch();
                            });
                        });
                    }
                }
            });
    }

    removePost() {
        var self = this;
        const p = self.posts[0];
        console.log("Removing post");
        Remote.deletePost(p._id).then((resp) => {
            location.href="/";
        });
    }
}
