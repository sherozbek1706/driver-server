const express = require("express");
const { add } = require("./services");

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

module.exports = {
  addCar,
};
