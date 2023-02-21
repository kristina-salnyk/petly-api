function validateSchema(schema) {
  return (req, res, next) => {
    console.log("body in validator",req.body)
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: `${error.message}`,
      });
    }
    next();
  };
}

module.exports = { validateSchema };

