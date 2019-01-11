/*jslint node: true, es6: true,esversion: 6 */
import winston from "winston";

winston.loggers.add('default', {
    console: {
        colorize: true,
        label: 'default',
        timestamp: function(){
            return new Date();
        }
    }
});

var defaultLogger = winston.loggers.get('default');

export default defaultLogger;
