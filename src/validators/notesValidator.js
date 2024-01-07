const {check, validationResult} = require('express-validator');

const validateNotes = [
  check('id')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Notes ID can not be empty!')
    .bail()
    .isNumeric()
    .withMessage('Notes ID Should be Numeric')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({success:false, errors: errors.array()});
    next();
  },
];

const validateCreateNotes = [
    check('note')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Note Cannot be Empty!')
    .bail()
    .isLength({min: 1})
    .withMessage('Note cannot be Empty!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({success:false, errors: errors.array()});
    next();
  },
];

module.exports = {
  validateNotes,
  validateCreateNotes
}