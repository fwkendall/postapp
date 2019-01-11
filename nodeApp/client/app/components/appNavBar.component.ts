// NavBar
import { Component,Input, AfterViewInit, NgZone, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import UserService from '../services/user.service'
import { DialogService } from "ng2-bootstrap-modal"
import {PostComponent} from "./post.component"
import Store from "../services/store.service"

// Service injectable via angular
import {LoggerService} from "../services/logger.service";
import Remote from "../services/remote.service"

import {User} from '../models/user';
import {Post} from "../models/post";

declare const gapi: any;

@Component({
    selector: "topNavBar",
    templateUrl: "./appNavBar.component.html",
    styleUrls:['./app.component.css'],
    providers: [LoggerService, DialogService]

})

export class AppNavBar implements AfterViewInit {
    isLogin: boolean = false;
    subTitle: string = "Please login";

    @Output() didPost: EventEmitter<Post> = new EventEmitter<Post>();
    @Output() search: EventEmitter<string> = new EventEmitter<string>();
    @Output() didLogin: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild("searchText") searchText: ElementRef;

    constructor(private logger: LoggerService, private dialogService: DialogService, private zone:NgZone) {
        this.logger.tag = "AppNavBar";
    }

    ngAfterViewInit() {
        this.logger.info("view init");
        let user = UserService.getUser();
        if (user) {
            this.onLogin(user);
        }
    }

    onLogin(user: User) {
        this.logger.info(" Get user login");
        //console.dir(user);
        this.isLogin = true;
        this.subTitle =  user.email;
        this.didLogin.emit("done");
    }

    createPost() {
        var self = this;
        let disposable = this.dialogService.addDialog(PostComponent, {
            title:'Create Post',
            message:''})
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    let post = Store.newPost;
                    if (post) {
                        Remote.addPost(post).then((resp) => {
                            self.zone.run(() => {
                                self.didPost.emit(post);
                            });
                            Store.newPost = null;
                        });
                    }
                }
            });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout

    }

    searchValueChange(event: any) {
        let searchValue = this.searchText.nativeElement.value || "";
        //console.log("search text change:" + searchValue);
        this.search.emit(searchValue);

    }

    logout() {
        UserService.logout();
    }
}
