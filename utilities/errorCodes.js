const errorCodes = new Map();
errorCodes.set(11000,"User with this email exists already");
errorCodes.set(500,"Internal Server Error");
errorCodes.set(500,"Internal Server Error");


module.exports = {errorCodes};