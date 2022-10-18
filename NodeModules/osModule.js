const os = require('os');

console.log(os.hostname());
console.log(os.platform());
console.log(os.release());
console.log(os.networkInterfaces());
console.log("freemem: ", os.freemem(), " bytes");
console.log("totalmem: ", os.totalmem(), " bytes");