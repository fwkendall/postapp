
import { Component, NgZone } from '@angular/core';

import {Post} from "../models/post";
import Remote from "../services/remote.service"

declare const gapi: any;

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string = "World of Posts";
    posts: Post[] = [];
    constructor(private zone:NgZone) {
        /*this.posts = [
            new Post("1","Hello Canada!", "P1"),
            new Post("2","Hello India!", "P2"),
            new Post("3","Hello US", "P3"),
            new Post("4","Hello UK", "P4"),
            new Post("5", "Hello France", "P5"),
            new Post("6","Hello World", "P6")
        ];

        console.dir(this.posts);*/

        //this.fetch();

    }

    fetch() {
        var self = this;
        Remote.getPosts().then((results) => {
            console.log("Fetch Post");
            console.dir(results);
            var temp:Post[] = [];
            let array:any[] = results.posts || [];
            self.zone.run(() => {
                for (let item of array) {
                    var post = new Post(item.id, item.body, item.title);
                    post.date = item.date;
                    post.userId = item.userId;
                    temp.push(post);
                }
                this.posts = temp;
            });
        });
    }

    onCreatePost() {
        //this.fetch();
    }

}
