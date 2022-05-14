// Challenges:
// DONE: Challenge 1
// Add JavaScript that:
// 1. on page load, fetches the images using the url above ⬆️
// 2. parses the response as JSON
// 3. adds image elements to the DOM for each 🤔 image in the array

// DONE: Challenge 2
// After the first challenge is completed, add JavaScript that:
// 1. on page load, fetches all the dog breeds using the url above ⬆️
// 2. adds the breeds to the page in the <ul> provided in index.html

// DONE: Challenge 3
// 1. Once all of the breeds are rendered in the <ul>, add JavaScript so that:
// when the user clicks on any one of the <li>s, the font color of that <li> changes.
// 2. This can be a color of your choosing.

// DONE: Challenge 4
// Once we are able to load all of the dog breeds onto the page:
// 1. add JavaScript so that the user can filter breeds that start with a particular letter using a dropdown (Links to an external site.).
// 2. For example, if the user selects 'a' in the dropdown, only show the breeds with names that start with the letter a.
// 3. For simplicity, the dropdown only includes the letters a-d. However, we can imagine expanding this to include the entire alphabet.

// console.log('%c HI', 'color: firebrick')

function fetchItems() {
    fetchImages();
    fetchAndFilterBreeds();
}

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

    return fetch(imgUrl)
        .then((response) => response.json())
        .then((obj) => {
            // console.log("obj: ", obj);
            // console.log("obj[\"message\"]: ", obj["message"]);
            // console.log("typeof(obj): ", typeof(obj));
            // console.log("typeof(obj[\"message\"]): ", typeof(obj["message"]));
            obj["message"].forEach((i) => {
                // console.log("i: ", i);
                let iImage = document.createElement("img");
                iImage.src = i;
                let dogImageContainer = document.querySelector("#dog-image-container");
                dogImageContainer.append(iImage);
            });
        })
        .catch((error) => {
            alert(`Something went wrong!\n Error: ${error.message}`);
        });
}

function clearBreeds() {
    // Clear out the entire list items now that we have a filtered array:
    let dogBreedsUl = document.querySelector("#dog-breeds");
    dogBreedsUl.innerHTML = "";
}

function fetchAndFilterBreeds() {
    // console.log("fetchBreeds() function called");
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let dogBreedsArray = [];

    fetch(breedUrl)
        .then((response) => response.json())
        .then((arrayObj) => {
            // console.log("fetchBreeds() function's arrayObj: ", arrayObj);
            // console.log("fetchBreeds() function's arrayObj[\"message\"]: ", arrayObj["message"]);
            // console.log("typeof (arrayObj[\"message\"]):", typeof(arrayObj["message"]));
            // NOTE: We are dealing with an object that contains multiple arrays
            let arrayObjKeys = Object.keys(arrayObj["message"]);
            // console.log("arrayObjKeys: ", arrayObjKeys);
            let dogBreedsUl = document.querySelector("#dog-breeds");
            for (key in arrayObjKeys) {
                // console.log("arrayObjKeys[key]: ", arrayObjKeys[key]);
                let newLi = document.createElement("li");
                newLi.textContent = arrayObjKeys[key];
                dogBreedsUl.append(newLi);
                dogBreedsArray.push(newLi.textContent);
            }
            return dogBreedsArray;
        })
        .then(() => {
            // console.log("dogBreedsUl complete");
            dogBreedListItems = document.querySelectorAll("#dog-breeds li");
            // console.log("dogBreedListItems: ", dogBreedListItems);
            // console.log("typeof(dogBreedListItems): ", typeof(dogBreedListItems));
            dogBreedListItems.forEach((item) => {
                // console.log("item: ", item);
                item.addEventListener("click", () => {
                    item.style.color = "green";
                })
            });
        })
        .then(() => {
            // NOTE: Run the first time page load for 'A' results first somehow:
            let breedDropdownMenu = document.querySelector("#breed-dropdown");
            // MDN Docs for 'change' event for 'select' HTML element:
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
            breedDropdownMenu.addEventListener("change", (e) => {
                // Clear out the existing
                let dogBreedsUl = document.querySelector("#dog-breeds");
                dogBreedsUl.innerHTML = "";
                let filteredArray = [];
                // console.log("breedDropDownMenu event listener called");
                // console.log("dogBreedsArray: ", dogBreedsArray);
                dogBreedsArray.filter((dogBreedElement) => {
                    // console.log("e.target.value: ", e.target.value);
                    // console.log("dogBreedElement: ", dogBreedElement);
                    // console.log("dogBreedElement[0]: ", dogBreedElement[0]);
                    // dogBreedElement[0] === e.target.value;
                    if (dogBreedElement[0] === e.target.value) {
                        filteredArray.push(dogBreedElement);
                        let newLi = document.createElement("li");
                        newLi.textContent = dogBreedElement;
                        dogBreedsUl.append(newLi);     
                    } else if (e.target.value === "reset") {
                        let newLi = document.createElement("li");
                        newLi.textContent = dogBreedElement;
                        dogBreedsUl.append(newLi);
                    }
                });
                // console.log("filteredArray: ", filteredArray);
            });
        })
        .catch((error) => {
            alert(`Something went wrong!\n Error: ${error.message}`);
        });
}

document.addEventListener("DOMContentLoaded", fetchItems);
