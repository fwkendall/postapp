import {Component, ElementRef, AfterViewInit, EventEmitter, Output, NgZone, AfterViewChecked} from '@angular/core';
import {User} from '../models/user';
import UserService from "../services/user.service"

declare const gapi: any;
declare const location:any;

@Component({
    selector: 'google-signin',
    template: '<button id="googleBtn" type="button" class="btn btn-outline-primary">Google Sign-In</button>'
})


export class GoogleSigninComponent implements AfterViewInit, AfterViewChecked {

    // Output: Event emitter
    @Output() userLogin: EventEmitter<User> = new EventEmitter<User>();

    private clientId:string = '551295064026-n35tosn5k1tiesb2ciqoroppes4230fd.apps.googleusercontent.com';

    private scope = [
        'profile',
        'email',
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/contacts.readonly',
        'https://www.googleapis.com/auth/admin.directory.user.readonly'
    ].join(' ');

    public auth2: any;
    public googleInit() {
        let that = this;
        gapi.load('auth2', function () {
            that.auth2 = gapi.auth2.init({
                client_id: that.clientId,
                cookiepolicy: 'single_host_origin',
                scope: that.scope
            });
            that.attachSignin(that.element.nativeElement.firstChild);
        });
    }
    public attachSignin(element) {
        let that = this;
        this.auth2.attachClickHandler(element, {},
            function (googleUser) {
                // Logging
                let profile = googleUser.getBasicProfile();
                console.log('Token || ' + googleUser.getAuthResponse().id_token);
                console.log('ID: ' + profile.getId());
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail());
                //YOUR CODE HERE
                var user = new User();
                user.id = profile.getId();
                user.name = profile.getName();
                user.email = profile.getEmail();
                user.imageUrl = profile.getImageUrl();
                user.token = googleUser.getAuthResponse().id_token;

                // Emit Success Login
                //console.dir(user);
                that.zone.run(() => {
                    UserService.setUser(user);
                    that.userLogin.emit(user);
                });
            }, function (error) {
                console.log(JSON.stringify(error, undefined, 2));
            });
        }

        constructor(private element: ElementRef, private zone:NgZone) {
            console.log('ElementRef: ', this.element);
        }

        ngAfterViewInit() {

        }

        ngAfterViewChecked() {
            if (gapi) {
                this.googleInit();
            } else {
                console.log("gapi is not loaded => reloading");
                location.reload();
            }
        }

    }
