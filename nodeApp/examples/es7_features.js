/*jslint node: true, es7: true,esversion: 6 */

// Utility
var ifPrint = (expression, message) => {
  if (expression) {
    console.log(message);
  }
};

// Exponential function
(function TestExp() {
  let base = 3;
  let exponent = 4;
  let result = base**exponent;
  console.log(`base = ${base}, exponent = ${exponent}, result = base**exponent = ${result}`); //81
})();




// Include
(function ArrayInclude() {
  let friends = ['Laba', 'Lele', 'Pungi', 'Kutta', 'Lej', 'Hondo', 'Dim', 'BB'];
  ifPrint(friends.includes('Laba'), "Laba is my friend");
  ifPrint(!friends.includes('Goba'), "Goba is not my friend");
})();
