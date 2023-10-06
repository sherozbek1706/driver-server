const express = require("express");
const cors = require("cors");
const ip = require("ip");
const config = require("./shared/config");

const app = express();

app.use(cors());
app.use(express.json());

// import handleError
const handleError = require("./shared/errors/handle");

// import router
const admin_route = require("./modules/admin/_api");
const carmodel_route = require("./modules/car-model/_api");
const carregion_route = require("./modules/car-region/_api");
const car_route = require("./modules/car/_api");
const driver_route = require("./modules/driver/_api");

// registered router
app.use(admin_route);
app.use(carmodel_route);
app.use(carregion_route);
app.use(car_route);
app.use(driver_route);

// registered Error
app.use(handleError);

app.listen(config.port || 5001, () => {
  console.log(`SERVER HAS BEEN STARTED ON LOCAL PORT ${config.port || 5001}`);
  console.log(
    `SERVER HAS BEEN STARTED ON PORT http://${ip.address()}:${
      config.port || 5001
    }`
  );
});
