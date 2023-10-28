const { app, server } = require("./socketio");
const express = require("express");
const ip = require("ip");
const config = require("./shared/config");

server.listen(config.port || 5001, () => {
  console.log(`SERVER HAS BEEN STARTED ON LOCAL PORT ${config.port || 5001}`);
  console.log(
    `SERVER HAS BEEN STARTED ON PORT http://${ip.address()}:${
      config.port || 5001
    }`
  );
});
