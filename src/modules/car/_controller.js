const express = require("express");
const { add, list, edit } = require("./services");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addCar = async (req, res, next) => {
  try {
    const result = await add({ body: req.body });
    res.status("201").json({ data: result });
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
const listCar = async (req, res, next) => {
  try {
    const result = await list();
    res.status("200").json({ data: result });
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
const editCar = async (req, res, next) => {
  try {
    const result = await edit({ body: req.body, params: req.params });
    res.status("200").json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCar,
  listCar,
  editCar,
};
