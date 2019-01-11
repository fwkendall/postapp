import { Component, ViewChild, Output, NgZone, ElementRef } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import Remote from "../services/remote.service"
import Store from "../services/store.service"

import {Post} from "../models/post";
import {User} from '../models/user';
import UserService from "../services/user.service";


export interface ConfirmModel {
    title:string;
    message:string;
}
@Component({
    selector: 'confirm',
    templateUrl: './post.component.html'

})
export class PostComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string;
    message: string;
    postTitle: string = "Add a title";
    postBody: string = "Add post";

    @ViewChild('postTitle') postTitleInputRef: ElementRef;
    @ViewChild('postBody') postBodyInputRef: ElementRef;

    constructor(dialogService: DialogService, private zone:NgZone) {
        super(dialogService);
    }
    confirm() {
        // we set dialog result as true on click on confirm button,
        // then we can get dialog result from caller code
        let user = UserService.getUser();
        let title = this.postTitleInputRef.nativeElement.value || user.name + "'s post'";
        let body =  this.postBodyInputRef.nativeElement.value ||  "Empty post" ;
        let timestamp = Date.now().toString();
        var post = new Post(timestamp,title, body);
        post.date = new Date();
        post.userId = user.id;
        post.userEmail = user.email;
        post.userName = user.name;
        Store.newPost = post;
        this.result = true;
        this.close();
    }
}
