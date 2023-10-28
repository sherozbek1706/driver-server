const express = require("express");
const { add, list, opened, closed, progress, remove } = require("./services");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addOrder = async (req, res, next) => {
  try {
    const result = await add({ body: req.body, user: req.user });
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
const listOrder = async (req, res, next) => {
  try {
    const result = await list();
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
const openedOrder = async (req, res, next) => {
  try {
    const result = await opened({ user: req.user });
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
const removeOrder = async (req, res, next) => {
  try {
    const result = await remove({ params: req.params });
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
const closedOrder = async (req, res, next) => {
  try {
    const result = await closed();
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
const progressOrder = async (req, res, next) => {
  try {
    const result = await progress();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrder,
  listOrder,
  openedOrder,
  closedOrder,
  progressOrder,
  removeOrder,
};
