const express = require("express");
const { checkCode, register, login } = require("./services");


/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const checkCodeUser = async (req, res, next) => {
  try {
    const result = await checkCode({ body: req.body });
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
const registerUser = async (req, res, next) => {
  try {
    const result = await register({
      body: req.body,
      image: `/files/users/${req.file.filename}`,
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
const loginUser = async (req, res, next) => {
  try {
    const result = await login({ body: req.body });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkCodeUser, registerUser, loginUser };
