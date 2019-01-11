import { Component,Input, AfterViewInit, NgZone } from '@angular/core';
import {Post} from "../models/post";
import { Response } from '@angular/http';
import { ServerService } from '../server/server.service';
import UserService from '../services/user.service'
@Component({
    selector: "post-list",
    templateUrl: "./postList.component.html",
    styleUrls:['./app.component.css']

})

export class PostListComponent implements AfterViewInit {
    @Input() posts: Post[];
    allPost: Post[];
    searchValue: string = "";
    sortAuthor: boolean = false;
    sortTitle: boolean = false;
    ngAfterViewInit() {
        // contentChild is set after the content has been initialized
        console.log('didmount');
        if (UserService.getUser()) {
            this.fetch();
        }
    }

    fetch() {
        const self = this;
        this.serverService.getPosts()
        .subscribe(
            (response: Response) => {
                // this.posts.push(response.json);
                console.dir(response);
                self.zone.run(() => {
                    self.allPost = response;
                    self.setupPostList();
                });
            },
            (error) => console.log(error)
        );
    }


    setupPostList() {
        var temp: Post[] = [];
        if (this.searchValue) {
            let filterList = this.allPost.filter((post) => {
                let postTextAll = post.title + post.body;
                return postTextAll.toLowerCase().includes(this.searchValue.toLowerCase());
            });
            temp = filterList;
        } else {
            temp = this.allPost;
        }
        temp.sort((p1, p2) => {
            let date1: number = Date.parse(p1.createdAt);
            let date2: number = Date.parse(p2.createdAt);
            if (date1 > date2) {
                return -1;
            }
            if (date1 < date2) {
                return 1;
            }
            if (date1 == date2) {
                return 0;
            }
        });


        if (this.sortTitle) {
            temp.sort((p1, p2) => {
                let prop1: string = p1.title;
                let prop2: string = p2.title;
                if (prop1 > prop2) {
                    return 1;
                }
                if (prop1 < prop2) {
                    return -1;
                }
                if (prop1 == prop2) {
                    return 0;
                }
            });
        }

        if (this.sortAuthor) {
            temp.sort((p1, p2) => {
                let prop1: string = p1.userName;
                let prop2: string = p2.userName;
                if (prop1 > prop2) {
                    return 1;
                }
                if (prop1 < prop2) {
                    return -1;
                }
                if (prop1 == prop2) {
                    return 0;
                }
            });
        }

        this.posts = temp;
    }

    onCreatePost() {
        console.log("List: On create");
        this.fetch();
    }

    onSearch(searchValue: string) {
        console.log("Search => " + searchValue);
        this.searchValue = searchValue;
        this.setupPostList();
    }

    onAuthorClick() {
        this.sortAuthor = !this.sortAuthor;
        this.sortTitle = false;
        this.setupPostList();
    }

    onTitle() {
        this.sortTitle = !this.sortTitle;
        this.sortAuthor = false;
        this.setupPostList();
    }

    onLogin() {
        this.fetch();
    }


    constructor(private serverService: ServerService, private zone:NgZone) {}
}
