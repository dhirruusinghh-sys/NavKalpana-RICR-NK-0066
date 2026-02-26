const dietService = require("../services/dietService");

exports.generatePlan = (req, res, next) => {
  try {
    const result = dietService.generateDiet(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};