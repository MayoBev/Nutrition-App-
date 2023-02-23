const searchForm = document.getElementById("search-form")
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

const apiId = "dcb54f1d"
const apiKey = "9affe95a2361b265fa643729a13a2e14"


const searchResult = async (event) => {
    // prevents form reload
    event.preventDefault()
    // take value from search input
    const searchValue = searchInput.value
    console.log(searchValue)

    try {
      const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${apiId}&app_key=${apiKey}&ingr=${searchValue}&category=generic-foods`
 
      const apiResponse = await fetch(apiUrl)
      
      if (apiResponse.status !== 200) {
        throw new Error ("Something went wrong, try again later!")
    } else {
      // get the data object
      const data = await apiResponse.json()
    console.log(data?.parsed?.[0]?.food)
    }

    } catch (error) {
      const errorEl = document.createElement("h3")
        errorEl.textContent = "Service unavailable";
        document.body.appendChild(errorEl).style.color = "red"
    }

  };

  searchForm.addEventListener('submit', searchResult)

