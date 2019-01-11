/**
 * Created by pushanmitra on 8/1/19.
 */
/*jslint node: true, es6: true,esversion: 6 */

import express from "express";
import router from './routes';
import logger from './logger';
// import database from './database';
import dbConfig from './database/db.config';
import mongoose from 'mongoose';

//import path from "path";

export default function () {
  var app = express();
  var isProduction = (process.env.NODE_ENV === "production");
  var port = isProduction ? process.env.PORT : 8001;
  router(app);

  // database.connect().then(() => {
  //     app.listen(port, () => {
  //       logger.info("Server running on port => " + port);
  //     });
  // }).catch((err) => {
  //    logger.info("Database connection unavailable, not running app"); 
  // });

  // Configuring the database
  

  mongoose.Promise = global.Promise;

  // Connecting to the database
  mongoose.connect(dbConfig.url, {
      useNewUrlParser: true
  }).then(() => {
      console.log("Successfully connected to the database");    
      app.listen(port, () => {
        logger.info("Server running on port => " + port);
      });
  }).catch(err => {
      console.log('Could not connect to the database. Exiting now...', err);
      logger.info("Database connection unavailable, not running app"); 
      process.exit();
  });

}
