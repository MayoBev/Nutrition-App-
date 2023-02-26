const searchForm = document.getElementById("search-form")
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

const apiId = "dcb54f1d"
const apiKey = "9affe95a2361b265fa643729a13a2e14"


const searchFood = async (event) => {
  // prevents form reload
  event.preventDefault()
  // take value from search input
  const searchValue = searchInput.value
  // console.log(searchValue)
  try {
    // get API url
    const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${apiId}&app_key=${apiKey}&ingr=${searchValue}&category=generic-foods`
    // get API's response
    const apiResponse = await fetch(apiUrl)
    // check if status code is not 200
    if (apiResponse.status !== 200) {
      throw new Error("Something went wrong, try again later!")
    } else {
      // get the data object
      const data = await apiResponse.json()
      
      // get food name on to the page
      const foodLabel = document.querySelector('.food-title')
      foodLabel.textContent = `${data?.parsed?.[0]?.food.label}`  
      // select the img element
      const foodImage = document.querySelector('.food-image')
      const imageUrl = data?.parsed?.[0]?.food.image
      // set the image source from API data
      foodImage.setAttribute("src", imageUrl)
      // select the "ul"
      const macroValues = document.querySelector('.macro-values')

      // add macro info to the "li" elements
      macroValues.firstElementChild.textContent = `${data?.parsed?.[0]?.food.nutrients.CHOCDF} g`
      macroValues.children[1].textContent = `${data?.parsed?.[0]?.food.nutrients.PROCNT} g`
      macroValues.children[2].textContent = `${data?.parsed?.[0]?.food.nutrients.FAT} g`
      searchInput.value = ""
           
      
      // If you added an input that is not avaiable on the api
      if (data?.parsed?.[0]?.food.label === undefined || imageUrl === undefined) {
        // reset to default food name
        foodLabel.textContent = 'Food Name'
        
        const wrongInput = document.querySelector('.wrong-input')
        wrongInput.textContent = 'Food not found'
        // reset to default food image
        const foodImage = document.querySelector('.food-image')
        const imageSrc = "./Assets/Images/pexels-mateusz-feliksik-13428053.jpg"
        foodImage.setAttribute("src", imageSrc)
        const wrongMacro = document.querySelectorAll(".macro-result")
        wrongInput.textContent = ""
      }
      
      // Sava to local storage
      // console.log(data?.parsed?.[0]?.food.label)
      localStorage.setItem('food', JSON.stringify(foodLabel));
    }
    // catch API error--
  } catch (error) {
    // create an H3 element
    const errorMessage = document.createElement("h3")
    errorMessage.textContent = "Service unavailable"
    const banner = document.querySelector(".banner")
    banner.appendChild(errorMessage).style.color = "red"
  }
  
};

const getFoodInfo = data => {
    
}

searchForm.addEventListener('submit', searchFood)

//select button 
const addToList = document.getElementById("addToList")
//Declare function that will populate using API data. 
//
const createList = () => {
  const foodList = document.getElementById("food-list")
  foodList.innerHTML = `<div class="card" style="width: 18rem">
  <img
    src="Assets/Images/avocado-dark-wood-background.jpeg"
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title">Avocado</h5>
    <ul id="macroInfo">
      <li>Carbs</li>
      <li>Protein</li>
      <li>Fat</li>
    </ul>
  </div>
</div>`

  console.log("It works")
}

addToList.addEventListener("click", createList)
