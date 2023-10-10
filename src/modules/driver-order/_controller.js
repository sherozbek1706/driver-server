const express = require("express");
const { get, list, handover } = require("./services");

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

