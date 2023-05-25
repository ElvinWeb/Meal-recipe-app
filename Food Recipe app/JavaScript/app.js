const searchBtn = document.getElementById("search-btn");
const mealList = document.querySelector("#meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("show-recipe");
});

function getMealList() {
  let searchInputValue = document.getElementById("search-input").value.trim();
  fetch(`https:themealdb.com/api/json/v1/1/filter.php?i=${searchInputValue}`)
    .then((res) => res.json())
    .then((data) => {
      let mealData = "";
      console.log(data);
      if (data.meals) {
        data.meals.forEach((meal) => {
          mealData += `<div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-image">
                  <img src="${meal.strMealThumb}" alt="" />
                </div>
                <div class="meal-name">
                  <h3>${meal.strMeal}</h3>
                  <a href="#" class="recipe-btn">Get recipe</a>
                </div>
              </div>`;
        });
        mealList.classList.remove("notfound");
      } else {
        mealData = " Sorry , We didn't find any meal";
        mealList.classList.add("notfound");
      }
      mealList.innerHTML = mealData;
    })
    .catch((err) => console.log(err));
}

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https:themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        mealRecipeModal(data.meals);
      });
  }
}

function mealRecipeModal(meal) {
  meal = meal[0];
  let mealRecipe = "";
  mealRecipe += `<h2 class="recipe-title">${meal.strMeal}</h2>
  <p class="recipe-category">${meal.strCategory}</p>
  <div class="recipe-instruct">
    <h3>Instruction:</h3>
    <p>${meal.strInstructions}</p>
  </div>
  <div class="recipe-meal-img">
    <img src="${meal.strMealThumb}" alt="" />
  </div>
  <div class="recipe-video-link">
    <a href="${meal.strYoutube}" target="_blank">Watch video</a>
  </div>`;

  mealDetailsContent.innerHTML = mealRecipe;
  mealDetailsContent.parentElement.classList.add("show-recipe");
}
