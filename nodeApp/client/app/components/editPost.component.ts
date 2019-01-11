import { Component, ViewChild, Output, NgZone } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import Remote from "../services/remote.service"
import Store from "../services/store.service"

import {Post} from "../models/post";
import {User} from '../models/user';
import UserService from "../services/user.service"
import { Location } from '@angular/common';
export interface ConfirmModel {
    title:string;
    message:string;
    passTitle:string;
    passBody:string;
    passPostId: string;
}
@Component({
    selector: 'confirm',
    templateUrl: './editPost.component.html'

})
export class EditPostComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string;
    message: string;
    passPostId: string;
    passTitle:string;
    passBody:string;
    postTitle: string = "Add a title";
    postBody: string = "Add post";

    @ViewChild('postTitle') postTitleInputRef: ElementRef;
    @ViewChild('postBody') postBodyInputRef: ElementRef;

    constructor(dialogService: DialogService, private zone:NgZone, private location: Location) {
        super(dialogService);
    }
    confirm() {
        // we set dialog result as true on click on confirm button,
        // then we can get dialog result from caller code
        // let user = UserService.getUser();
        let title = this.postTitleInputRef.nativeElement.value || user.name + "'s post'";
        let body =  this.postBodyInputRef.nativeElement.value ||  "Empty post" ;
        var post = new Post("-1",title, body);
        post.date = new Date();
        // post.userId = user.id;
        // post.userEmail = user.email;
        // post.userName = user.name;
        Store.newPost = post;
        this.result = true;
        this.close();
    }
    delete() {
        const self = this;
        console.log('delete post pop up');
        if (confirm("Are You sure you want to delete your post?")) {
            Store.confirmDelete = true;
            Remote.deletePost(this.passPostId).then((resp) => {
                self.zone.run(() => {
                    // self.didPost.emit(post);
                    self.location.back();
                });
            });
            this.close();
        } else {
            Store.confirmDelete = false;            
        }        
    }
}
