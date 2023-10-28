const express = require("express");
const {
  add,
  list,
  show,
  login,
  remove,
  unremove,
  onActive,
  offActive,
  listActive,
  edit,
  removedList,
  info,
  pay,
} = require("./services");

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
const removedListDriver = async (req, res, next) => {
  try {
    const result = await removedList();
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

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const loginDriver = async (req, res, next) => {
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
const removeDriver = async (req, res, next) => {
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
const payDriver = async (req, res, next) => {
  try {
    const result = await pay({ params: req.params, body: req.body });
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
const unremoveDriver = async (req, res, next) => {
  try {
    const result = await unremove({ params: req.params });
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
const onActiveDriver = async (req, res, next) => {
  try {
    const result = await onActive({ params: req.user });
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
const offActiveDriver = async (req, res, next) => {
  try {
    const result = await offActive({ params: req.user });
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
const listActiveDriver = async (req, res, next) => {
  try {
    const result = await listActive();
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
const infoDriver = async (req, res, next) => {
  try {
    const result = await info({ user: req.user });
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
const editDriver = async (req, res, next) => {
  try {
    let result;
    if (req.params.id == "me") {
      result = await edit({
        params: req.user,
        user: req.user,
        body: req.body,
        image: req.file ? `/files/driver/${req.file.filename}` : null,
      });
    } else {
      result = await edit({
        params: req.params,
        user: req.user,
        body: req.body,
        image: req.file ? `/files/driver/${req.file.filename}` : null,
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
  loginDriver,
  removeDriver,
  unremoveDriver,
  onActiveDriver,
  offActiveDriver,
  listActiveDriver,
  editDriver,
  removedListDriver,
  infoDriver,
  payDriver,
};
