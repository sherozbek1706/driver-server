const express = require("express");
const { add, list, show } = require("./services");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addDriver = async (req, res, next) => {
  try {
    const result = await add({
      body: req.body,
      image: `/files/driver/${req.file.filename}`,
      user: req.user,
    });
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
const listDriver = async (req, res, next) => {
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
const showDriver = async (req, res, next) => {
  try {
    let result;
    if (req.params.id == "me") {
      result = await show({
        params: req.user,
        user: req.user,
        role: req.user.role,
      });
    } else {
      result = await show({
        params: req.params,
        user: req.user,
        role: req.user.role,
      });
    }
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addDriver,
  listDriver,
  showDriver,
};
