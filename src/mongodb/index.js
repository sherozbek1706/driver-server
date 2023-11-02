const mongoose = require("mongoose");

const connection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/codes")
    .then(() => {
      console.log("CONNECT MONGODB DATABASE");
    })
    .catch(() => {
      console.log("COULDN'T MONGODB CONNECT");
    });
};

module.exports = connection;
