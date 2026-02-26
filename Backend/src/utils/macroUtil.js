exports.calculateMacros = (calorieTarget, goal, mealsPerDay) => {
  const templates = {
    weight_loss: { protein: 0.4, carbs: 0.3, fat: 0.3 },
    muscle_gain: { protein: 0.3, carbs: 0.5, fat: 0.2 },
    maintenance: { protein: 0.3, carbs: 0.4, fat: 0.3 }
  };

  const selected = templates[goal];
  if (!selected) throw new Error("Invalid goal");

  // Daily macros in grams
  const protein = (calorieTarget * selected.protein) / 4;
  const carbs = (calorieTarget * selected.carbs) / 4;
  const fat = (calorieTarget * selected.fat) / 9;

  // Per meal calories
  const caloriesPerMeal = Math.round(calorieTarget / mealsPerDay);

  return {
    dailyTarget: calorieTarget,
    macroSplit: {
      proteinGrams: Math.round(protein),
      carbsGrams: Math.round(carbs),
      fatGrams: Math.round(fat)
    },
    mealsPerDay,
    caloriesPerMeal,
    macroSplitPercent: selected
  };
};