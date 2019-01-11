import { Component, ViewChild, Output, NgZone } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import Remote from "../services/remote.service"
import Store from "../services/store.service"

import {Post} from "../models/post";
import {User} from '../models/user';
import UserService from "../services/user.service"

export interface ConfirmModel {
    title:string;
    message:string;    
}
@Component({
    selector: 'confirm',
    templateUrl: './comment.component.html'

})
export class CommentComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
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
        let user = UserService.getUser();       
        let body =  this.postBodyInputRef.nativeElement.value ||  "Empty comment" ;
        var comment = {
            content: body,
            date: new Date(),
            userId: user.id,
            userName: user.name,

        };     
        Store.newComment = comment;
        this.result = true;
        this.close();
    }    
}
