import Joi from 'joi';

const addUser = {
  body: {
    name: Joi.string().max(100).required(),
  },
};

const addHobby = {
  body: {
    name: Joi.string().max(100).required(),
    passionLevel: Joi.string().valid(['Low', 'Medium', 'High', 'Very-High']).required(),
    year: Joi.number().required(),
  },
};

const updateHobby = {
  body: {
    name: Joi.string().max(100),
    passionLevel: Joi.string().valid(['Low', 'Medium', 'High', 'Very-High']),
    year: Joi.number(),
  },
};

export default {
  addUser,
  addHobby,
  updateHobby,
}
