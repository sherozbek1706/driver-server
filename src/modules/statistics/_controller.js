const express = require("express");
const {
  topDriver,
  dailyOrder,
  dailyPaid,
  newDrivers,
  dailyWork,
  dailyPayment,
} = require("./services");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const topDriverStatistic = async (req, res, next) => {
  try {
    const result = await topDriver();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const dailyOrderStatistic = async (req, res, next) => {
  try {
    const result = await dailyOrder();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const dailyPaidStatistic = async (req, res, next) => {
  try {
    const result = await dailyPaid();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const dailyWorkStatistic = async (req, res, next) => {
  try {
    const result = await dailyWork({ params: req.user });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const newDriversStatistic = async (req, res, next) => {
  try {
    const result = await newDrivers();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const dailyPaymentStatistic = async (req, res, next) => {
  try {
    const result = await dailyPayment();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  topDriverStatistic,
  dailyOrderStatistic,
  dailyPaidStatistic,
  newDriversStatistic,
  dailyWorkStatistic,
  dailyPaymentStatistic,
};
