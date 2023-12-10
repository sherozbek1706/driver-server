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
app.use("/files", express.static(path.join(__dirname, "../../../public")));

// import handleError
const handleError = require("../shared/errors/handle");

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://sherozbek.uz",
      "https://api.sherozbek.uz",
      "https://haydovchi.sherozbek.uz",
      `http://${ip.address()}:3000`,
      `http://${ip.address()}:3001`,
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

// app.use(cors({ origin: ["https://sherozbek.uz", "http://localhost:3000"] }));
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
const payments_route = require("../modules/payments/_api");
const users_route = require("../modules/users/_api");
const driver_chat = require("../modules/driver-chat/_api");

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
app.use(payments_route);
app.use(users_route);
app.use(driver_chat);

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
  socket.on("buyurtma_qushish", async (data) => {
    socket.broadcast.emit("yangi_buyurtmani_olish", { msg: "go" });
  });

  socket.on("buyurtma_uchirish", async (data) => {
    socket.broadcast.emit("yangi_buyurtmani_olish", { msg: "go" });
  });

  socket.on("buyurtmani_qabul_qilish", async (data) => {
    socket.broadcast.emit("buyurtma_qabul_qilindi", { msg: "go" });
  });

  socket.on("buyurtma_bajarildi", async (data) => {
    socket.broadcast.emit("buyurtma_tuliq_bajarildi", data);
  });

  socket.on("hayvochini_activligini_almashtirish", async (data) => {
    socket.broadcast.emit("haydovchini_aktivligi_almashtirilsin", {
      msg: "go",
    });
  });

  socket.on("manzilga_yetib_keldim", async (data) => {
    socket.broadcast.emit("haydovchi_manzilga_yetib_kelibdi", { msg: "go" });
  });
  socket.on("yulovchi_bilan_yulga_chiqdik", async (data) => {
    socket.broadcast.emit("haydovchi_yulovchi_bilan_yulga_chiqdi", {
      msg: "go",
    });
  });

  socket.on("haydovchi_yangi_habar_yozdi", async (data) => {
    socket.broadcast.emit("haydovchi_yangi_habar_yozdi_uqish_kerak", {
      msg: "go",
    });
  });
});

module.exports = {
  app,
  server,
};
