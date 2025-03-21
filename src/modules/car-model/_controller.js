const express = require("express");
const { add, list, remove, edit } = require("./services");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addCarModel = async (req, res, next) => {
  try {
    const result = await add({ body: req.body });
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
const listCarModel = async (req, res, next) => {
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
const removeCarModel = async (req, res, next) => {
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
const editCarModel = async (req, res, next) => {
  try {
    const result = await edit({ params: req.params, body: req.body });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCarModel,
  listCarModel,
  removeCarModel,
  editCarModel,
};
