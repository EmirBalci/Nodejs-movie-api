const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb://localhost:27017/movie",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  mongoose.connection.on("open", () => {
    console.log("Connected Db.");
  });

  mongoose.connection.on("error", err => {
    console.log("Not Connect to db.", err);
  });

  mongoose.Promise = global.Promise;
};
