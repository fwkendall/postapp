import { Component,Input } from '@angular/core';
import {Post} from "../models/post";

@Component({
    selector: "display-post",
    templateUrl: "./displayPost.component.html",
    styleUrls:['./app.component.css']

})

export class DisplayPostComponent {
    @Input() post: Post;
}
