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

// IN-PROGRESS: Challenge 4
// Once we are able to load all of the dog breeds onto the page:
// 1. add JavaScript so that the user can filter breeds that start with a particular letter using a dropdown (Links to an external site.).
// 2. For example, if the user selects 'a' in the dropdown, only show the breeds with names that start with the letter a.
// 3. For simplicity, the dropdown only includes the letters a-d. However, we can imagine expanding this to include the entire alphabet.

console.log('%c HI', 'color: firebrick')

function fetchItems() {
    fetchImages();
    fetchBreeds();
}

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

    return fetch(imgUrl)
        .then((response) => response.json())
        .then((obj) => {
            console.log("obj: ", obj);
            console.log("obj[\"message\"]: ", obj["message"]);
            // console.log("typeof(obj): ", typeof(obj));
            // console.log("typeof(obj[\"message\"]): ", typeof(obj["message"]));
            obj["message"].forEach((i) => {
                console.log("i: ", i);                
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

function filterBreeds(e) {
    console.log("filterBreeds() function called");
    // let breedDropdownMenuValue = document.querySelector("#breed-dropdown").value;
    // console.log("breedDropdownMenuValue: ", breedDropdownMenuValue);
    console.log("e.target.value: ", e.target.value);
    // NOTE:
    // There are two approaches to this:
    // 1. Use 'e.target.value'
    // 2. Use already existing 'breedDropdownMenu'
    // However, I think it's more interesting with event.target.value to be more flexible for the event itself:
    dogBreedListItemsObj = document.querySelectorAll("#dog-breeds li");
    console.log("dogBreedListItemsObj: ", dogBreedListItemsObj);
    console.log("typeof(dogBreedListItemsObj): ", typeof(dogBreedListItemsObj));
    let dogBreedKeys = Object.keys(dogBreedListItemsObj);
    console.log("dogBreedKeys: ", dogBreedKeys);
    let filteredList = [];

    // Add keys to 'filteredList' array:
    for (key in dogBreedKeys) {
        console.log("dogBreedListItemsObj[key]: ", dogBreedListItemsObj[key]);
        console.log("dogBreedListItemsObj[key].textContent: ", dogBreedListItemsObj[key].textContent);
        if (dogBreedListItemsObj[key].textContent[0] === event.target.value) {
            console.log("Dog breed begins with letter, ", event.target.value);
            console.log("dogBreedListItemsObj[key].textContent: ", dogBreedListItemsObj[key].textContent);
            filteredList.push(dogBreedListItemsObj[key].textContent);
        }
    }
    console.log("Checking filteredList array: ");
    console.log("filteredList: ", filteredList);

    // Clear the list:
    clearBreeds()
    let dogBreedsUl = document.querySelector("#dog-breeds");
    // Filter the list:
    for (let element of filteredList) {
        console.log("element: ", element)
        let newLi = document.createElement("li");
        newLi.textContent = element;
        dogBreedsUl.append(newLi);
    }
    // TODO:
    // Figure out where exactly in the logic we need to 're-fetch' the list:
    // TODO: Figure out why this only works for the first filter action
    if (filteredList.length === 0) {
        fetchBreeds();
        filterBreeds();
    }
}

function fetchBreeds() {
    console.log("fetchBreeds() function called");
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    fetch(breedUrl)
        .then((response) => response.json())
        .then((arrayObj) => {
            console.log("fetchBreeds() function's arrayObj: ", arrayObj);
            console.log("fetchBreeds() function's arrayObj[\"message\"]: ", arrayObj["message"]);
            console.log("typeof (arrayObj[\"message\"]):", typeof(arrayObj["message"]));
            // NOTE: We are dealing with an object that contains multiple arrays
            let arrayObjKeys = Object.keys(arrayObj["message"]);
            console.log("arrayObjKeys: ", arrayObjKeys);
            let dogBreedsUl = document.querySelector("#dog-breeds");
            for (key in arrayObjKeys) {
                console.log("arrayObjKeys[key]: ", arrayObjKeys[key]);
                let newLi = document.createElement("li");
                newLi.textContent = arrayObjKeys[key];
                dogBreedsUl.append(newLi);
            }
        })
        .then(() => {
            console.log("dogBreedsUl complete");
            dogBreedListItems = document.querySelectorAll("#dog-breeds li");
            console.log("dogBreedListItems: ", dogBreedListItems);
            console.log("typeof(dogBreedListItems): ", typeof(dogBreedListItems));
            dogBreedListItems.forEach((item) => {
                console.log("item: ", item);
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
            breedDropdownMenu.addEventListener("change", filterBreeds)
            // console.log("breedDropdownMenu.value: ", breedDropdownMenu.value);
        })
        .catch((error) => {
            alert(`Something went wrong!\n Error: ${error.message}`);
        });
}

let firstTimeRun = true;

document.addEventListener("DOMContentLoaded", fetchItems);

