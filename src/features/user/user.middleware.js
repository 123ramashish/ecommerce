import { body, validationResult } from "express-validator";

const validRegistration = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password length should be greater than 5"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).send(validationErrors.array()[0].msg);
  }

  next();
};

export default validRegistration;
