/**
 * Created by pushanmitra on 24/12/18.
 */
/*jslint node: true, es6: true,esversion: 6 */

/*
 * Import / Require
 */
import logger from './logger';
import serverMain from './server';
logger.info("Starting Web server");
serverMain();
