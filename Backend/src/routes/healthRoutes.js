const express = require("express");
const router = express.Router();
const {
  createHealthProfile,
  getHealthProfile
} = require("../controllers/healthController");

router.post("/create", createHealthProfile);
router.get("/:user_id", getHealthProfile);


module.exports = router;