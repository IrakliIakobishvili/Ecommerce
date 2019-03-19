const Joi = require("joi");

const emailAndPassword = {
  email: Joi.string()
    // .email({ minDomainAtoms: 2 })
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.empty":
            err.message = "Email should not be empty!";
            break;
          case "string.email":
            err.message = "Email should be valid!";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  password: Joi.string()
    .min(6)
    .max(15)
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.empty":
            err.message = "Password should not be empty!";
            break;
          case "string.min":
            err.message = `Password should have at least ${
              err.context.limit
            } characters!`;
            break;
          case "string.max":
            err.message = `Password should have at most ${
              err.context.limit
            } characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    })
};

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(409).json(result.error.details[0].message);
        // return res.status(400).json({error: result.error.details[0].message});
      }

      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  schemas: {
    registerSchema: Joi.object().keys({
      firstName: Joi.string()
        .min(1)
        .max(15)
        .required(),
      lastName: Joi.string()
        .min(1)
        .max(20)
        .required(),
      ...emailAndPassword,
      age: Joi.number()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Age should not be empty!"; // Remove this case
                break;
              case "number.base":
                err.message = "Age should be valid!";
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      birthday: Joi.number()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "number.base":
                err.message = "Birthday should be valid!";
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      phone: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Phone should not be empty!";
                break;
              default:
                break;
            }
          });
          return errors;
        })
    }),
    loginSchema: Joi.object().keys({
      ...emailAndPassword
    }),
    categorySchema: Joi.object().keys({
      categoryID: Joi.string()
        .min(1)
        .max(20)
        .required(),
      title: Joi.string()
        .min(1)
        .max(20)
        .required()
    }),
    productSchema: Joi.object().keys({
      name: Joi.string()
        .min(1)
        .max(20)
        .required(),
      category: Joi.string()
        .min(1)
        .max(20)
        .required(),
      quantity: Joi.number().required(),
      details: Joi.object().keys({
        dimensions: Joi.string()
          .min(1)
          .max(20)
          .required(),
        weight: Joi.string()
          .min(1)
          .max(20)
          .required(),
        displayType: Joi.string()
          .min(1)
          .max(20)
          .required(),
        displaySize: Joi.string()
          .min(1)
          .max(20)
          .required(),
        displayResolution: Joi.string()
          .min(1)
          .max(20)
          .required(),
        cpu: Joi.string()
          .min(1)
          .max(20)
          .required(),
        internalMemory: Joi.string()
          .min(1)
          .max(20)
          .required(),
        ram: Joi.string()
          .min(1)
          .max(20)
          .required(),
        os: Joi.string()
          .min(1)
          .max(20)
          .required(),
        camera: Joi.string()
          .min(1)
          .max(20)
          .required(),
        color: Joi.string()
          .min(1)
          .max(20)
          .required(),
        price: Joi.number().required(),
        photo: Joi.string()
          .min(1)
          .max(60)
          .required()
      })
    })
  }
};
