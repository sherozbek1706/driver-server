const express = require("express");
const {
  login,
  add,
  list,
  show,
  remove,
  unremove,
  edit,
  off_active,
} = require("./services");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const loginAdmin = async (req, res, next) => {
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
const addAdmin = async (req, res, next) => {
  try {
    const result = await add({
      body: req.body,
      image: `/files/admin/${req.file.filename}`,
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
const listAdmin = async (req, res, next) => {
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
const showAdmin = async (req, res, next) => {
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

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const removeAdmin = async (req, res, next) => {
  try {
    const result = await remove({ params: req.params, user: req.user });
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
const unremoveAdmin = async (req, res, next) => {
  try {
    const result = await unremove({ params: req.params, user: req.user });
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
const editAdmin = async (req, res, next) => {
  try {
    let result;
    if (req.params.id == "me") {
      result = await edit({
        params: req.user,
        user: req.user,
        role: req.user.role,
        body: req.body,
        image: `/files/admin/${req.file.filename}`,
      });
    } else {
      result = await edit({
        params: req.params,
        user: req.user,
        role: req.user.role,
        body: req.body,
        image: `/files/admin/${req.file.filename}`,
      });
    }
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
const offActiveAdmin = async (req, res, next) => {
  try {
    let result;
    if (req.params.id == "me") {
      result = await off_active({
        params: req.user,
        user: req.user,
        role: req.user.role,
      });
    } else {
      result = await off_active({
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
  loginAdmin,
  addAdmin,
  listAdmin,
  showAdmin,
  removeAdmin,
  unremoveAdmin,
  editAdmin,
  offActiveAdmin,
};
