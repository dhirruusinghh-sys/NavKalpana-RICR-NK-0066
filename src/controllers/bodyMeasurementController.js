const service = require("../services/bodyMeasurementService");


exports.createMeasurement = async (req, res) => {
  try {
    const data = await service.addMeasurement(req.body);

    res.status(201).json({
      success: true,
      message: "Body measurements saved successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



exports.getMeasurements = async (req, res) => {
  try {
    const data = await service.getMeasurementAnalytics(req.params.user_id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No measurements found"
      });
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};