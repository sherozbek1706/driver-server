const express = require("express");
const { checkCode, register, login, show, checkMe, myorder } = require("./services");

// /**
//  *
//  * @param {express.Request} req
//  * @param {express.Response} res
//  * @param {express.NextFunction} next
//  */
// const registerUser = async (req, res, next) => {
//   try {
//     const result = "";
//     res.status(201).
//   } catch (error) {
//     next(error);
//   }
// };

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

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const showUser = async (req, res, next) => {
  try {
    const result = await show({ user: req.user });
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
const checkMeUser = async (req, res, next) => {
  try {
    const result = await checkMe({ user: req.user });
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
const myorderUser = async (req, res, next) => {
  try {
    const result = await myorder({ user: req.user, params: req.params });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkCodeUser, registerUser, loginUser, showUser, checkMeUser,myorderUser };
