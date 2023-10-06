const express = require("express");
const { add } = require("./services");

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
      user: req.user
    });
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addDriver,
};
