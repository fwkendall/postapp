// Standard Logger service for web client app
// Example of typescript variable length arg
// Usage: Component or module can include this service and add tag so, logging will print tag to distinguish logs of
// other component.


// Importing @angular/core/Injectable to create injectable service
// Note: `abcd ${js obj}` - string template
import {Injectable} from "@angular/core";

@Injectable() export class LoggerService {
    public tag: string = "FILE";
    public info(...args: any[]) {
        let msg = `[info | ${this.tag} ]:`;
        let newArg = [msg].concat(args);
        console.log.apply(console, newArg);
    }

    public error(...args: any[]) {
        let msg = `[error | ${this.tag} ]:`;
        let newArg = [msg].concat(args);
        console.error.apply(console, newArg);
    }

    public warn(...args: any[]) {
        let msg = `[warn | ${this.tag} ]:`;
        let newArg = [msg].concat(args);
        console.warn.apply(console, newArg);
    }
}