const express = require("express");
const cors = require("cors");
const ip = require("ip");
const config = require("./shared/config");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(config.port || 5001, () => {
  console.log(`SERVER HAS BEEN STARTED ON LOCAL PORT ${config.port || 5001}`);
  console.log(
    `SERVER HAS BEEN STARTED ON PORT http://${ip.address()}:${
      config.port || 5001
    }`
  );
});
