import {Injectable,EventEmitter} from "@angular/core";
import {User} from "../models/user"

declare const sessionStorage:any;
declare const location:any;

class UserService extends EventEmitter<any> {
    public appUser: User;
    public setUser(user: User) {
        this.appUser = user;
        if(sessionStorage) {
            sessionStorage.setItem("user",JSON.stringify(user));
        }
    }
    public getUser() {
        return this.appUser;
    }

    public logout() {
        this.appUser = null;
        if(sessionStorage) {
            sessionStorage.removeItem("user");
        }
        location.reload();
    }

    constructor() {
        super();

        if(sessionStorage && sessionStorage.getItem("user")) {
            let userstr = sessionStorage.getItem("user");
            console.log("Existing user: " + userstr);
            let userObj = JSON.parse(userstr);
            let user = new User();
            user.email = userObj.email;
            user.id = userObj.id;
            user.name = userObj.name;
            user.token = userObj.token;
            user.imageUrl = user.imageUrl;
            console.dir(user);
            this.appUser = user;
        }
    }

}

let userService = new UserService();

export default userService;
