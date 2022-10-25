import { validationResult } from "express-validator";

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req);
  // we're passing the req object to validationResult which will try to validate the request based on the body('name'). it's enhancing or introspecting the request object
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  }
  // if we don't get an error, we call next and move on to the handler
  next();
}