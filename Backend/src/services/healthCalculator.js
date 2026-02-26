const calculateResults = (profile) => {
  const {
    age,
    biological_sex,
    height_cm,
    weight_kg,
    activity_level,
    primary_goal
  } = profile;

  const heightInMeters = height_cm / 100;

  // BMI
  const bmi = weight_kg / (heightInMeters * heightInMeters);

  // BMR (Mifflin-St Jeor)
  let bmr;
  if (biological_sex === "Male") {
    bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5;
  } else {
    bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161;
  }

  const activityMap = {
    Sedentary: 1.2,
    Light: 1.375,
    Moderate: 1.55,
    Active: 1.725,
    "Very Active": 1.9
  };

  const multiplier = activityMap[activity_level] || 1.2;
const maintenanceCalories = bmr * multiplier;

  let suggestedCalories = maintenanceCalories;

  if (primary_goal === "Weight Loss") {
    suggestedCalories -= 500;
  } else if (primary_goal === "Muscle Gain") {
    suggestedCalories += 300;
  }

  // Safety Floor
  if (biological_sex === "Female" && suggestedCalories < 1200) {
    suggestedCalories = 1200;
  }

  if (biological_sex === "Male" && suggestedCalories < 1500) {
    suggestedCalories = 1500;
  }

  return {
    bmi: Number(bmi.toFixed(2)),
    maintenanceCalories: Math.round(maintenanceCalories),
    suggestedCalories: Math.round(suggestedCalories)
  };
};

module.exports = { calculateResults };