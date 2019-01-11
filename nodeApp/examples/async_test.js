/*jslint node: true, es7: true,esversion: 6 */
// Actual Async method
let callBack = {
  get() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: "x"
        });
      }, 5000);
    });
  }
};

// Wrapper Call
async function asyncCallback() {
  console.log(`Starting ${new Date()}`);
  let data = await callBack.get();
  console.log(`Ending ${new Date()}`);
  console.dir(data);
  return data;
}

asyncCallback().then(data => {
  console.log("Received Data");
  console.dir(data);
});

async function* generateAsyncIterator() {
  const arrayOfPromises = [
    new Promise((resolve, reject) => {
      setTimeout(resolve, 1000, 'foo');
    }),
    new Promise((resolve, reject) => {
      setTimeout(resolve, 1500, 'bar');
    }),
    new Promise((resolve, reject) => {
      setTimeout(resolve, 2000, 'lol');
    })
  ]

  let nextIndex = 0
  while (nextIndex < arrayOfPromises.length) {
    const response = await arrayOfPromises[nextIndex];
    nextIndex++;
    yield response;
  }
}
async function asyncIteratorFunction() {
  let asyncIterator = generateAsyncIterator()

  console.log(await asyncIterator.next()); // returns {value: "foo", done: false}
  console.log(await asyncIterator.next()); // returns {value: "bar", done: false}
  console.log(await asyncIterator.next()); // returns {value: "lol", done: false}
  console.log(await asyncIterator.next()); // returns {value: undefined, done: true}
}

asyncIteratorFunction();
