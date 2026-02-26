const db = require("../config/db");
const { calculateResults } = require("../services/healthCalculator");

/*
CREATE PROFILE
*/
const createHealthProfile = (req, res) => {
  const user_id = req.user?.id || req.body.user_id;
  

  const {
    age,
    biological_sex,
    height_cm,
    weight_kg,
    activity_level,
    experience_level,
    primary_goal
  } = req.body;

  const cleanedActivityLevel = activity_level?.trim();

const allowedLevels = ["Sedentary", "Light", "Moderate", "Active", "Very Active"];

if (!allowedLevels.includes(cleanedActivityLevel)) {
  return res.status(400).json({ message: "Invalid activity level" });
}

  if (
    !user_id ||
    !age ||
    !biological_sex ||
    !height_cm ||
    !weight_kg ||
    !activity_level ||
    !experience_level ||
    !primary_goal
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
    INSERT INTO health_profiles
    (user_id, age, biological_sex, height_cm, weight_kg,
     activity_level, experience_level, primary_goal)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      user_id,
      age,
      biological_sex,
      height_cm,
      weight_kg,
      cleanedActivityLevel,
      experience_level,
      primary_goal
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Health profile saved successfully"
      });
    }
  );
};

/*
GET PROFILE + CALCULATED VALUES
*/
const getHealthProfile = (req, res) => {
  const user_id = req.params.user_id;

  db.query(
    "SELECT * FROM health_profiles WHERE user_id = ?",
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(404).json({ message: "Profile not found" });

      const profile = results[0];
      const calculations = calculateResults(profile);

      res.json({
        profile: {
          age: profile.age,
          biological_sex: profile.biological_sex,
          height_cm: profile.height_cm,
          weight_kg: profile.weight_kg,
          activity_level: profile.activity_level,
          experience_level: profile.experience_level,
          primary_goal: profile.primary_goal
        },
        calculated: calculations
      });
    }
  );
};

module.exports = {
  createHealthProfile,
  getHealthProfile
};