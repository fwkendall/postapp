/**
 * Created by pushanmitra on 9/1/19.
 */
/*jslint node: true, es6: true,esversion: 6 */


// var url = 'mongodb://mongo:27017';
var urlLocal = 'mongodb://127.0.0.1:27017/concierge';
var urlDocker =  'mongodb://mongo:27017/concierge';

var env = process.env.NODE_ENV;

var url = urlLocal;
if (env === 'docker') {
    url = urlDocker;
}


export default {
    'url': url
};
