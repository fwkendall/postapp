import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as moment from 'moment';
@Injectable()
export class ServerService {
  constructor(private http: Http) {}  
  getPosts() {
    return this.http.get('http://localhost:8001/api/posts')
    .map(
      (response: Response) => {
        const data = response.json();
        data.map((r) => {
          r.createdAt = moment(r.createdAt).format('MM/DD/YYYY HH:mm')
          return r;
        })
        
        return data;
      }
    );
  }
  getPost(postId) {
    return this.http.get(`http://localhost:8001/api/posts/${postId}`)
    .map(
      (response: Response) => {
        const data = response.json();
        data.createdAt = moment(data.createdAt).format('MM/DD/YYYY HH:mm');
        if(data.comments){
          data.comments.map((d) => {
            d.date = moment(d.date).format('MM/DD/YYYY HH:mm');
            return d;
          })
          data.comments.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
          })
        }
        return data;
      }
    );
  }
}