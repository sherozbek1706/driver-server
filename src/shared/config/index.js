const dotenv = require("dotenv");

dotenv.config();

const config = {
  port: process.env.PORT,
  db: {
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expirec_in: process.env.JWT_EXPIRES_IN,
  },
  payment: {
    money: process.env.PAYMENT_MONEY,
    action: process.env.PAYMENT_ACTION,
  },
};

module.exports = config;
