const mongoose = require("mongoose");
// const morgan = require('morgan');
const config = require("../config");

mongoURL = `mongodb://${config.db.user}:${config.db.pass}@ds243931.mlab.com:${
  config.db.port
}/${config.db.name}`;
mongoose.connect(
  mongoURL,
  { useNewUrlParser: true }
);

mongoose.Promise = Promise;
const db = mongoose.connection;

Array.prototype.includesId = function(objectId) {
  return this.some(id => id.equals(objectId));
};

const dbPromise = new Promise((res, rej) => {
  db.on("error", e => rej(e));
  db.once("open", () => res());
});

dbPromise
  .then(() => {
    console.log("MONGO_DB: is connected");
  })
  .catch(e => {
    console.log("error", e);
    process.exit(1);
  });
