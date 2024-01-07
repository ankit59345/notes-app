const {check, validationResult} = require('express-validator');

const validateRegisterUser = [
  check('userName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Please provide User Name!')
    .bail()
    .isLength({min: 3})
    .withMessage('Please provide valid User Name!')
    .bail(),
  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Notes ID can not be empty!')
    .isLength({min: 3})
    .withMessage('Please provide valid User Name!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({success:false, errors: errors.array()});
    next();
  },
];

module.exports = {
  validateRegisterUser
}