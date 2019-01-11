//import {User} from "../models/user"

import {Post} from "../models/post"
/*let RemoteConfig = {
    base: "http://localhost:8001",
    endPoints: {
        test: '/test',
        login: '/login'
    },
    getURL: (endPoint: string) => {
        return this.base + endPoint;
    },
    getTestURL: () => {
        return this.getURL(this.endPoints.test);
    },
    getLoginURL: () => {
        return this.getURL(this.endPoints.login);
    }
}*/

let testURL: string = "http://localhost:8001/test"
let postURL: string = "http://localhost:8001/api/posts"
let commentURL: string = "http://localhost:8001/api/comments"
let getPostsURL: string = "http://localhost:8001/posts"
declare const $: any;

class Remote {

    test() {
        $.ajax({url: testURL, success: function(result){
            console.dir(result);
        }});
    }

    login() {
    }

    addPost(post: Post) {

        return new Promise((resolve, reject) => {
            $.post(postURL, post, (resp, status) => {
                console.log("Status: " + status);
                if (resp.status === "ok") {
                    console.log("OK");
                    resolve();
                } else {
                    reject("Error");
                }
            });
        });


    }

    getPosts() {
        return new Promise((resolve, reject) => {
            $.ajax({url: getPostsURL, success: function(result){
                console.dir(result);
                resolve(result);
            }});
        });
    }

    updatePost(postId:string, post: Post) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${postURL}/${postId}`,
                type: 'PUT',
                data: post,
                success: function(result){
                    console.dir(result);
                    resolve(result);
                }
            });
        });
    }

    deletePost(postId:string) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${postURL}/${postId}`,
                type: 'DELETE',                
                success: function(result){
                    console.dir(result);
                    resolve(result);
                }
            });                          
        });
    }

    addComment(postId:string, comment: Object) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${commentURL}/${postId}`,
                type: 'PUT',
                data: comment,
                success: function(result){
                    console.dir(result);
                    resolve(result);
                }
            });
        });
    }

    
}

let remote = new Remote();

export default remote;
