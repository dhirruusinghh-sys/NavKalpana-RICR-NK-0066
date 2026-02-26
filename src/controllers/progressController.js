const ProgressService = require("../services/progressService");

// POST API
exports.createProgress = async (req, res) => {
  try {
    const result = await ProgressService.createLog(req.body);

    res.status(201).json({
      success: true,
      message: "Progress logged successfully",
      data: result
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getProgress = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const result = await ProgressService.getAnalytics(user_id);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};