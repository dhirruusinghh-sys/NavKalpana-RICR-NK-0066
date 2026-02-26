const { calculateMacros } = require("../utils/macroUtil");

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

exports.generateDiet = (data) => {
  const { calorieTarget, goal, mealsPerDay } = data;

  if (!calorieTarget || !goal || !mealsPerDay) {
    throw new Error("Missing required fields");
  }

  const macros = calculateMacros(calorieTarget, goal, mealsPerDay);

  // Generate weekly plan
  const weeklyPlan = daysOfWeek.map(day => {
    const meals = [];
    const caloriesPerMeal = macros.caloriesPerMeal;

    for (let i = 0; i < mealsPerDay; i++) {
      meals.push({
        name: `Meal ${i + 1}`,
        calories: caloriesPerMeal,
        macros: {
          protein: Math.round(macros.macroSplit.proteinGrams / mealsPerDay),
          carbs: Math.round(macros.macroSplit.carbsGrams / mealsPerDay),
          fat: Math.round(macros.macroSplit.fatGrams / mealsPerDay)
        }
      });
    }

    return {
      day,
      meals,
      dailyTotal: {
        calories: macros.dailyTarget,
        protein: macros.macroSplit.proteinGrams,
        carbs: macros.macroSplit.carbsGrams,
        fat: macros.macroSplit.fatGrams
      }
    };
  });

  return {
    goal,
    dailyTarget: calorieTarget,
    mealsPerDay,
    macroSplitPercent: macros.macroSplitPercent,
    weeklyPlan
  };
};