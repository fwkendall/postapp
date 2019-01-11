/*jslint node: true, es7: true,esversion: 6 */
// Iterator: Is function in which return function next() which return object {done: boolean, value: any}
// Interable: Object with a key type:[Symbol.iterator] and value type is Iterator
let fibonacciIterator = () => {
    let pre = 0, cur = 1;
    return {
        next() {
            [pre, cur] = [cur, pre + cur];
            return { done: false, value: cur };
        }
    };

};

let fibonacciIterator1 = () => {
    let pre = 0, cur = 1;
    return {
        next() {
            [pre, cur] = [cur, pre + cur];
            if (cur > 1000) {
              return {done: true, value: undefined};
            }
            return { done: false, value: cur };
        }
    };

};

let fibonacci = {
  [Symbol.iterator]: fibonacciIterator

};

let autoStopFibonacci = {
  [Symbol.iterator]: fibonacciIterator1
};

/* Another Approach of writing iterator (functional approach)
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}
 */

console.log("Force stop iteratior");
for (var n of fibonacci) {
    // truncate the sequence at 1000
    if (n > 1000)
        break;
    console.log(`Itr ${n}`);
}

console.log("Auto stop iteratior");
for (var n of autoStopFibonacci) {
    // truncate the sequence at 1000
    console.log(`Itr ${n}`);
}


// Generator (function*): Function or method with keyword function*. yield value mean next value.
var fibonacciGen = {
    [Symbol.iterator]: function*() {
        var pre = 0, cur = 1;
        for (;;) {
            var temp = pre;
            pre = cur;
            cur += temp;
            if (cur < 1000) {
                yield cur;
            } else {
                break;
            }

        }
    }
};

console.log("Iterator through generator");
for (var n of fibonacciGen) {
    // truncate the sequence at 1000
    console.log(`Gen ${n}`);
}
