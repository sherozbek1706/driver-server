const express = require("express");
const { get, list, handover, all, paid, driverorder } = require("./services");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getDriverOrder = async (req, res, next) => {
  try {
    const result = await get({ params: req.params, user: req.user });
    res.status(201).json({ data: result });
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
const listDriverOrder = async (req, res, next) => {
  try {
    const result = await list({ user: req.user });
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
const DriverOrder = async (req, res, next) => {
  try {
    const result = await driverorder({ params: req.params });
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
const handoverDriverOrder = async (req, res, next) => {
  try {
    const result = await handover({ params: req.params, user: req.user });
    res.status(201).json({ data: result });
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
const allDriverOrder = async (req, res, next) => {
  try {
    const result = await all();
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
const paidDriverOrder = async (req, res, next) => {
  try {
    const result = await paid({ params: req.params });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDriverOrder,
  listDriverOrder,
  handoverDriverOrder,
  allDriverOrder,
  paidDriverOrder,
  DriverOrder,
};
