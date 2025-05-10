const Joi = require('joi');

const createBoardSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().allow('', null).optional()
});

const updateBoardSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  description: Joi.string().allow('', null).optional()
});

module.exports = { createBoardSchema, updateBoardSchema };