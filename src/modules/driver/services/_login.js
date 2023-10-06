const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../../../shared/config");
const bcryptjs = require("bcryptjs");

const login = async ({ body }) => {
};

module.exports = login;
