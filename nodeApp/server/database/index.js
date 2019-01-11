/**
 * Created by pushanmitra on 9/1/19.
 */
/*jslint node: true, es6: true,esversion: 6 */
import mongodb from 'mongodb';
import bluebird from "bluebird";
import config from './db.config';
import logger from '../logger';

var MongoClient = mongodb.MongoClient;

class MongoManager {
    constructor() {
        logger.info("Mongo URL: " + config.url);
        this.mongoClient = new MongoClient(config.url);
    }
    connect() {
        return new Promise((resolve, reject)  => {
            this.mongoClient.connect((err) => {
                if (err) {
                    logger.error('MongoDB Connection [FAIL]');
                    reject(err);
                } else {
                    logger.info('MongoDB Connection [DONE]');
                    resolve();
                }
            });
        });
    }

    savePost() {

    }
}

export default new MongoManager();
