// Page navigation
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
}

// Workouts
const workoutList = document.getElementById("workoutList");

function loadWorkouts() {
  const saved = JSON.parse(localStorage.getItem("workouts")) || [];
  saved.forEach(addWorkoutToList);
}

function logWorkout() {
  const muscle = document.getElementById("muscle").value;
  const sets = document.getElementById("sets").value;
  const reps = document.getElementById("reps").value;
  const weight = document.getElementById("weight").value;

  if (!sets || !reps) return;

  const workout = `${muscle}: ${sets} sets x ${reps} reps @ ${weight || 0} kg`;
  addWorkoutToList(workout);

  const saved = JSON.parse(localStorage.getItem("workouts")) || [];
  saved.push(workout);
  localStorage.setItem("workouts", JSON.stringify(saved));

  document.getElementById("sets").value = "";
  document.getElementById("reps").value = "";
  document.getElementById("weight").value = "";
}

function addWorkoutToList(text) {
  const li = document.createElement("li");
  li.textContent = text;
  workoutList.appendChild(li);
}

// Food log
const foodList = document.getElementById("foodList");

function loadFood() {
  const saved = JSON.parse(localStorage.getItem("food")) || [];
  saved.forEach(addFoodToList);
  updateTotals();
}

function logFood() {
  const calories = document.getElementById("foodCalories").value;
  const protein = document.getElementById("foodProtein").value;
  if (!calories) return;

  const entry = `Calories: ${calories}, Protein: ${protein || 0}g`;
  addFoodToList(entry);

  const saved = JSON.parse(localStorage.getItem("food")) || [];
  saved.push({calories: Number(calories), protein: Number(protein || 0)});
  localStorage.setItem("food", JSON.stringify(saved));

  document.getElementById("foodCalories").value = "";
  document.getElementById("foodProtein").value = "";
  updateTotals();
}

function addFoodToList(entry) {
  const li = document.createElement("li");
  li.textContent = typeof entry === "string" ? entry : `Calories: ${entry.calories}, Protein: ${entry.protein}g`;
  foodList.appendChild(li);
}

function updateTotals() {
  const food = JSON.parse(localStorage.getItem("food")) || [];
  const totalCalories = food.reduce((a,b)=>a+b.calories,0);
  const totalProtein = food.reduce((a,b)=>a+b.protein,0);
  document.getElementById("calories").textContent = totalCalories;
  document.getElementById("protein").textContent = totalProtein;
  document.getElementById("score").textContent = Math.min(100, Math.round(totalProtein/150*100)) + "%"; // simple hypertrophy score
}

// Coach
function runCoach() {
  const age = Number(document.getElementById("age").value);
  const weight = Number(document.getElementById("weight").value);
  const height = Number(document.getElementById("height").value);
  const gender = document.getElementById("gender").value;

  const suggestions = [];

  if (weight < 60) suggestions.push("Consider increasing calorie intake for hypertrophy.");
  if (weight > 90) suggestions.push("Focus on higher volume and moderate weight for muscle definition.");
  if (!age || !weight || !height) suggestions.push("Fill all stats for better suggestions.");

  suggestions.push("Ensure protein intake is at least 1.6g per kg bodyweight.");
  suggestions.push("Train each muscle group 2-3 times per week for optimal hypertrophy.");

  const list = document.getElementById("coachSuggestions");
  list.innerHTML = "";
  suggestions.forEach(s=> {
    const li = document.createElement("li");
    li.textContent = s;
    list.appendChild(li);
  });
}

// Initial load
loadWorkouts();
loadFood();