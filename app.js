document.getElementById("searchBtn").addEventListener("click", () => {
  const item = document.getElementById("searchInput").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
    .then((res) => res.json())
    .then((data) => display(data.meals));
});
document.getElementById("searchInput").addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    document.getElementById("searchBtn").click();
  }
});
function display(meals) {
  document.getElementById("cardContainer").innerHTML = ``;
  document.getElementById("mainContainer").innerHTML = ``;
  if (meals === null) {
    document.getElementById("mainContainer").innerHTML = `
          <div class="text-center text-warning">
              <h2>No Items Found</h2>
            </div>
      `;
  } else {
    for (const meal of meals) {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="col">
            <div class="card h-100 bg-secondary text-white">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title text-center text-warning">${meal.strMeal}</h5>
                <p class="card-text">
                  <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne${meal.idMeal}">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne${meal.idMeal}"
            aria-expanded="false"
            aria-controls="flush-collapseOne${meal.idMeal}"
          >
            How to cook
          </button>
        </h2>
        <div
          id="flush-collapseOne${meal.idMeal}"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample${meal.idMeal}"
        >
          <div class="accordion-body">
            ${meal.strInstructions}
          </div>
        </div>
      </div>
    </div>
                </p>
              </div>
            </div>
          </div>
    `;
      document.getElementById("cardContainer").appendChild(div);
    }
  }
}
