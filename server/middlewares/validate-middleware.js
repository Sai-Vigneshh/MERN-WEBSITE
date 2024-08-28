const { ZodError } = require("zod");

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      const status = 422;
      const message = "Validation failed";

      const extraDetails = err.errors.map((curElem) => curElem.message);
      console.log(extraDetails)
      const error = new Error(message);
      error.status = status;
      error.details = extraDetails;
      console.log(error)

      next(error); // Pass the error to the error-handling middleware
    } else {
      // If the error is not a Zod validation error, pass it on
      next(err);
    }
  }
};

module.exports = validate;
