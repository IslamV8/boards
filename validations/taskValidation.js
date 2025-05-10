const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow('', null),
  icon: Joi.string().optional(),
  status: Joi.string().custom((value, helpers) => {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
    return helpers.error('any.invalid');
  }, 'Custom status validation'),
  boardId: Joi.string().required()
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  description: Joi.string().allow('', null).optional(),
  icon: Joi.string().optional(),
  status: Joi.string().custom((value, helpers) => {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
    return helpers.error('any.invalid');
  }, 'Custom status validation'),
  boardId: Joi.string().optional()
});

module.exports = { createTaskSchema, updateTaskSchema };
