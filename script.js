const petsApiUrl = "https://openapi.programming-hero.com/api/peddy/pets";
const exampleDogApi =
  "https://openapi.programming-hero.com/api/peddy/category/dog";
const exampleCatApi =
  "https://openapi.programming-hero.com/api/peddy/category/cat";
const exampleRabbitApi =
  "https://openapi.programming-hero.com/api/peddy/category/rabbit";
const exampleBirdApi =
  "https://openapi.programming-hero.com/api/peddy/category/bird";

// Control button UI and switching
const buttonDogs = document.getElementById("buttonDog");
const buttonCat = document.getElementById("buttonCat");
const buttonRabbits = document.getElementById("buttonRabbits");
const buttonBirds = document.getElementById("buttonBirds");
const noDataMessage = document.getElementById("no-data-message");

/////////// Color change or Mentioned as mark to select

////////////////////////////////////

let countdownInterval ;

function showModal() {
  console.log("show mallll runadslkfn");
  const modal = document.getElementById('modalx');
  const countdownElement = document.getElementById("countdownx");
  let countdownValue = 4; // Start from 3 seconds

  modal.classList.remove("hidden"); // Show the modal

  countdownInterval = setInterval(() => {
    countdownValue -= 1;
    countdownElement.textContent = countdownValue;

    if (countdownValue <= 0) {
      clearInterval(countdownInterval);
      hideModal(); // d
    }
  }, 1000); // Update countdown every second
}

function hideModal() {
  const modal = document.getElementById("modalx");
  modal.classList.add("hidden"); // Hide the modal
  clearInterval(countdownInterval); // Clear the countdown if it's still running
}

// Function to handle button clicks and apply selected styles
function handleButtonClick(selectedButton) {
  // Clear selected styles from all buttons asdfjkal hsdf
  [buttonDogs, buttonCat, buttonRabbits, buttonBirds].forEach((button) => {
    button.classList.remove("bg-blue-100", "border-blue-500");
  });

  // Apply selected styles to the clicked button yehdhsaklfhadkls;fjklads
  selectedButton.classList.add("bg-blue-100", "border-blue-500");
}

// Event listeners for each button
buttonDogs.addEventListener("click", () => handleButtonClick(buttonDogs));
buttonCat.addEventListener("click", () => handleButtonClick(buttonCat));
buttonRabbits.addEventListener("click", () => handleButtonClick(buttonRabbits));
buttonBirds.addEventListener("click", () => handleButtonClick(buttonBirds));

///////////////////////////////////////

function showSpinner() {
  // Get the spinner container (where the spinner will be shown)
  const gallery = document.getElementById("gallery");

  // If the gallery element doesn't exist, log an error and return
  if (!gallery) {
    console.error("Gallery element not found.");
    return;
  }

  // Set the gallery content to a spinner that is centered absolutely
  gallery.innerHTML = `

      <div class=" inset-0 flex justify-center items-center bg-white bg-opacity-50">
        <div class="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-blue-500"></div>
      </div>
    `;

  // Hide the spinner after 2 seconds
  setTimeout(() => {
    gallery.innerHTML = ""; // Clear the spinner (empty the gallery)
  }, 2000); // Spinner will be visible for 2 seconds (2000 milliseconds)
}

//////////////////////////////////////////

// Main function to fetch pet data and initialize the gallery
async function initPetGallery(apiUrl) {
  showSpinner();

  setTimeout(async () => {
    const gallery = document.getElementById("gallery");
    if (!gallery) {
      console.error("Gallery element not found.");
      return;
    }

    // Clear the existing gallery content
    gallery.innerHTML = "";

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Fetched data:", data); // Debugging: Log the fetched data

      if (data && data.data && data.data.length !== 0) {
        noDataMessage.style.display = "none";
        data.data.forEach((pet) => addPetCard(pet));
        console.log();
      } else if (data.data.length == 0) {
        noDataMessage.style.display = "block";
      } else {
        console.error("No pets found in the data:", data); // Debugging: Log an error if no pets found
      }
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  }, 2050);
}

// Function to add pet cards to the gallery
function addPetCard(pet) {
  const gallery = document.getElementById("gallery");
  if (!gallery) {
    console.error("Gallery element not found.");
    return;
  }

  const petCard = `
        <div class="card w-96 bg-base-100 shadow-md rounded-lg p-4">
          <figure>
            <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-lg" />
          </figure>
          <div class="card-body">
            <h2 class="card-title text-2xl font-bold">${
              pet.pet_name || "Not Available"
            }</h2>
            <p class="flex items-center">
              <span class="mr-2">🧬</span> 
              <span>Breed: ${pet.breed || "N/A"}</span>
            </p>
            <p class="flex items-center"> 
              <span class="mr-2">📅</span>
              <span>Birth: ${pet.date_of_birth || "Not Available"}</span>
            </p>
            <p class="flex items-center">
              <span class="mr-2">♀️</span>
              <span>Gender: ${pet.gender || "N/A"}</span>
            </p>
            <p class="flex items-center">
              <span class="mr-2">💲</span>
              <span>Price: ${
                pet.price !== null ? pet.price + "$" : "N/A"
              }</span>
            </p>
            <div class="card-actions justify-between mt-4">
              <button class="btn btn-outline btn-primary" onclick="logPetImage('${pet.image.replace(
                /'/g,
                "\\'"
              )}')">
               👍
              </button>
              <button class="btn btn-outline btn-primary" onclick="test()">
                Adopt
              </button>
              <button class="btn btn-outline" >Details</button>
            </div>
          </div>
        </div>
    `;

  gallery.innerHTML += petCard; // Append the new card
}
function test() {
  console.log("TEstingggggggggggggg");
}
// Function to log liked pet image and append it to the likedDiv
function logPetImage(imageUrl) {
  console.log(`Liked Pet Image URL: ${imageUrl}`);

  // Append the image to the likedDiv
  const likedDiv = document.querySelector(".likedDiv");

  if (!likedDiv) {
    console.error("LikedDiv element not found.");
    return;
  }

  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgElement.alt = "Liked Pet Image";
  imgElement.style.width = "124px"; // Set width to 124px
  imgElement.style.height = "124px"; // Set height to 124px
  imgElement.style.margin = "5px"; // Add some spacing between images
  imgElement.style.borderRadius = "10px";

  likedDiv.appendChild(imgElement); // Append the new image to the likedDiv
}

// Add event listeners to the buttons
buttonDogs.addEventListener("click", () => initPetGallery(exampleDogApi));
buttonCat.addEventListener("click", () => initPetGallery(exampleCatApi));
buttonRabbits.addEventListener("click", () => initPetGallery(exampleRabbitApi));
buttonBirds.addEventListener("click", () => initPetGallery(exampleBirdApi));

// Initialize the pet gallery on page load
window.onload = () => initPetGalleryy(petsApiUrl);

//////////////////////////////////////////////////////////////
let petData = []; // Declare a variable to hold the fetched pet data

async function initPetGalleryy(apiUrl) {
  const gallery = document.getElementById("gallery");
  if (!gallery) {
    console.error("Gallery element not found.");
    return;
  }

  // Clear the existing gallery content
  gallery.innerHTML = "";

  try {
    const response = await fetch(apiUrl);
    petData = await response.json(); // Store the fetched data
    console.log("Fetched data:", petData); // Debugging: Log the fetched data

    if (petData && petData.pets) {
      // Initially display the pets without sorting
      petData.pets.forEach((pet) => addPetCard(pet));
    } else {
      console.error("No pets found in the data:", petData); // Debugging: Log an error if no pets found
    }
  } catch (error) {
    console.error("Error fetching pet data:", error);
  }
}

// Function to sort and display pets by descending price
function sortPetsByPrice() {
  const gallery = document.getElementById("gallery");
  if (!gallery) {
    console.error("Gallery element not found.");
    return;
  }

  // Clear the existing gallery content
  gallery.innerHTML = "";
  noDataMessage.style.display ='none';

  // Sort the pets array by descending price
  petData.pets.sort((a, b) => b.price - a.price);

  // Loop through the sorted pets and add each pet card to the gallery
  petData.pets.forEach((pet) => addPetCard(pet));
}

// Function to add pet cards to the gallery
function addPetCard(pet) {
  const gallery = document.getElementById("gallery");
  if (!gallery) {
    console.error("Gallery element not found.");
    return;
  }
  const breed = pet.breed;
  const gender = pet.gender;
  const vaccinated_status = pet.vaccinated_status;
  const date_of_birth = pet.date_of_birth;
  const price = pet.price;
  const image = pet.image;
  const pet_details = pet.pet_details;

  const petCard = `
        <div class="card w-96 bg-base-100 shadow-md rounded-lg p-4">
          <figure>
            <img src="${pet.image}" alt="Pets" class="rounded-lg" />
          </figure>
          <div class="card-body">
            <h2 class="card-title text-2xl font-bold">${pet.pet_name}</h2>
            <p class="flex items-center">
              <span class="mr-2">🧬</span> 
              <span>Breed: ${pet.breed || "N/A"}</span>
            </p>
            <p class="flex items-center">
              <span class="mr-2">📅</span>
              <span>Birth: ${pet.date_of_birth || "Not Available"}</span>
            </p>
            <p class="flex items-center">
              <span class="mr-2">♀️</span>
              <span>Gender: ${pet.gender || "Not Available"}</span>
            </p>
            <p class="flex items-center">
              <span class="mr-2">💲</span>
              <span>Price: ${pet.price || "N/A"}$</span>
            </p>
            <div class="card-actions justify-between mt-4">
              <button class="btn btn-outline btn-primary" onclick="logPetImage('${pet.image.replace(
                /'/g,
                "\\'"
              )}')">
               👍
              </button>
              <button class="btn btn-outline btn-primary" onclick="showModal()">
                Adopt
              </button>
              <button class="btn btn-outline" onclick="showDetails(${
                pet.petId
              })">Details</button>
            </div>
          </div>
        </div>
    `;

  gallery.innerHTML += petCard; // Append the new card
}

// Function to log liked pet image and append it to the likedDiv
function logPetImage(imageUrl) {
  console.log(`Liked Pet Image URL: ${imageUrl}`);

  // Append the image to the likedDiv
  const likedDiv = document.querySelector(".likedDiv");

  if (!likedDiv) {
    console.error("LikedDiv element not found.");
    return;
  }

  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgElement.alt = "Liked Pet Image";
  imgElement.style.width = "124px"; // Set width to 124px
  imgElement.style.height = "124px"; // Set height to 124px
  imgElement.style.margin = "5px"; // Add some spacing between images
  imgElement.style.borderRadius = "10px";

  likedDiv.appendChild(imgElement); // Append the new image to the likedDiv
}

/////////////////////////////////////////////
const modalDiv = document.getElementById("modalDiv");
const modalSection = document.getElementById("modalSection");

const showDetails = (id) => {
  const newApiUrl = "https://openapi.programming-hero.com/api/peddy/pet/" + id;
  console.log(newApiUrl);
  console.log("Its happened with ID: " + id);

  // Get modalDiv and show the spinner immediately
  const modalDiv = document.getElementById("modalDiv");
  modalDiv.innerHTML = `
      <div class="flex justify-center items-center h-full">
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
      </div>
    `;
  modalDiv.classList.remove("hidden");

  // Show the spinner for 2 seconds before fetching the data
  setTimeout(() => {
    // Fetch pet data after 2 seconds
    fetch(newApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const pet = data.petData; // Accessing petData from response

        // Replace spinner with pet details in the modal
        modalDiv.innerHTML = `
            <div class="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
              <img src="${pet.image}" alt="${
          pet.pet_name || "Not Available"
        }" class="w-full h-auto rounded-md">
              <h2 class="text-xl font-bold mt-4">${
                pet.pet_name || "Not Available"
              }</h2>
              <p class="mt-2"><strong>Breed:</strong> ${
                pet.breed || "Not Available"
              }</p>
              <p><strong>Gender:</strong> ${pet.gender || "Not Available"}</p>
              <p><strong>Vaccinated Status:</strong> ${
                pet.vaccinated_status
              }</p>
              <p><strong>Date of Birth:</strong> ${pet.date_of_birth}</p>
              <p><strong>Price:</strong> $${pet.price || "Not Available"}</p>
              <p class="mt-4">${pet.pet_details || "Not Available"}</p>
              <button onclick="closeModal()" class="mt-4 btn bg-red-500 text-white">Close</button>
            </div>
          `;
      })
      .catch((error) => {
        console.error("Error fetching pet details:", error);
        modalDiv.innerHTML = `<p class="text-red-500">Error fetching pet details. Please try again later.</p>`;
      });
  }, 2000); // 2-second delay before fetching the data
};

// Function to close the modal
const closeModal = () => {
  const modalDiv = document.getElementById("modalDiv");
  modalDiv.classList.add("hidden");
};
