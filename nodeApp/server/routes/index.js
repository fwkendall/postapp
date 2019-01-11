/*jslint node: true, es6: true,esversion: 6 */
import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
import logger from '../logger';
import posts from '../controllers/post.controller.js';

var postsArray = [];

export default function RouteMain(app) {

  // Static dir path
  var staticDirPath = path.resolve(__dirname, "../..", "./client/www");
  // Body-parsing
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  logger.info('DirName:' + staticDirPath);

  // Static
  app.use('/static', express.static(staticDirPath));

  // Lib
  app.use('/lib', express.static(path.join(staticDirPath + '/lib')));

  // Assets
  app.use('/assets', express.static(path.join(staticDirPath + '/assets')));

  // Middlware
  app.use(function(req, res, next) {
    global.navigator = {
      userAgent: req.headers['user-agent']
    };
    next();
  });

  // Root route
  app.get('/', (req, res) => {
    //res.send('Hello world WebApp\n');
    let indexHtmlPath = path.join(staticDirPath + '/index.html');
    res.sendFile(indexHtmlPath);
  });

  app.get('/test', (req, resp) => {
      resp.send({ key: "Hello world"});
  });

  app.post('/login', (req, resp) => {
      let body = req.body;
      console.dir(body);
  });
  /** posts */

  // Create a new Note
  app.post('/api/posts', posts.create);

  // Retrieve all Notes
  app.get('/api/posts', posts.findAll);

  // Retrieve a single Note with noteId
  app.get('/api/posts/:postId', posts.findOne);

  // Update a Note with noteId
  app.put('/api/posts/:postId', posts.update);
  
  // Delete a Note with noteId
  app.delete('/api/posts/:postId', posts.delete);

  // Add Comment
  app.put('/api/comments/:postId', posts.addComment);

  app.post('/post', (req, res) => {
      var post = req.body;
      console.dir(post);
      post.id = "" + (postsArray.length + 1);
      postsArray.push(post);
      res.send({status: "ok"});
  });

  app.get('/posts', (req, resp) => {
      resp.send({posts: postsArray});
  });
}
