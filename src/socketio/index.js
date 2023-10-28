const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const path = require("path");
const ip = require("ip");
// const bodyParser = require("body-parser");
// const pdf = require("html-pdf");
// const order_list = require("../modules/order/services/_list");
const app = express();

const server = http.createServer(app);

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const pdfTemplate = require("../documents");

// public file static
app.use("/files", express.static(path.join(__dirname, "../public")));

// import handleError
const handleError = require("../shared/errors/handle");

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:5500",
      `http://${ip.address()}:3000`,
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

app.use(cors());

// import router
const admin_route = require("../modules/admin/_api");
const carmodel_route = require("../modules/car-model/_api");
const carregion_route = require("../modules/car-region/_api");
const car_route = require("../modules/car/_api");
const driver_route = require("../modules/driver/_api");
const address_route = require("../modules/address/_api");
const order_route = require("../modules/order/_api");
const driverorder_route = require("../modules/driver-order/_api");
const statistic_route = require("../modules/statistics/_api");

// registered router
app.use(admin_route);
app.use(carmodel_route);
app.use(carregion_route);
app.use(car_route);
app.use(driver_route);
app.use(address_route);
app.use(order_route);
app.use(driverorder_route);
app.use(statistic_route);

// app.post("/create-pdf", async (req, res) => {
//   pdf
//     .create(pdfTemplate(req.body), {})
//     .toFile(`${__dirname}/result.pdf`, async (err) => {
//       if (err) {
//         res.send(Promise.reject());
//       }

//       res.send(Promise.resolve());
//     });
// });

// app.get("/fetch-pdf", (req, res) => {
//   res.sendFile(`${__dirname}/result.pdf`);
// });

// registered Error
app.use(handleError);

io.on("connection", (socket) => {
  socket.on("add_order", async (data) => {
    socket.broadcast.emit("get_new_orders", { msg: "go" });
  });

  socket.on("accept_order", async (data) => {
    socket.broadcast.emit("get_action_order_driver", { msg: "go" });
  });

  socket.on("handover_order_driver", async (data) => {
    socket.broadcast.emit("get_action_order_driver", { msg: "go" });
  });

  socket.on("handover_order", async (data) => {
    socket.broadcast.emit("get_action_order", { msg: "go" });
  });

  socket.on("change_activity_driver", async (data) => {
    socket.broadcast.emit("get_action_driver", { msg: "go" });
  });
});

module.exports = {
  app,
  server,
};
