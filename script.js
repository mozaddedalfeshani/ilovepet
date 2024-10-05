const petsApiUrl = 'https://openapi.programming-hero.com/api/peddy/pets'


///button create with api



const buttonShow =()=>{

}


// content show all
function addPetCard(pet) {
    const gallery = document.getElementById('gallery');
    if (!gallery) {
        console.error("Gallery element not found.");
        return;
    }

    const petCard = `
        <div class="card w-96 bg-base-100 shadow-md rounded-lg p-4">
          <figure>
            <img src="${pet.image}" alt="Pets" class="rounded-lg" />
          </figure>
          <div class="card-body">
            <h2 class="card-title text-2xl font-bold">${pet.pet_name}</h2>
            <p class="flex items-center">
              <span class="mr-2">🧬</span> 
              <span>Breed: ${pet.breed || 'N/A'}</span>
            </p>
            <p class="flex items-center">
              <span class="mr-2">📅</span>
              <span>Birth: ${pet.birth || 'Unknown'}</span>
            </p>
            <p class="flex items-center">
              <span class="mr-2">♀️</span>
              <span>Gender: ${pet.gender}</span>
            </p>
            <p class="flex items-center">
              <span class="mr-2">💲</span>
              <span>Price: ${pet.price || 'N/A'}$</span>
            </p>
            <div class="card-actions justify-between mt-4">
              <button class="btn btn-outline btn-primary" onclick="logPetImage('${pet.image.replace(/'/g, "\\'")}')">
               👍
              </button>
              <button class="btn btn-outline btn-primary">
                Adopt
              </button>
              <button class="btn btn-outline">Details</button>
            </div>
          </div>
        </div>
    `;

    gallery.innerHTML += petCard;  // Append the new card
}

// This function will be triggered when the like button is clicked
function logPetImage(imageUrl) {
    console.log(`Liked Pet Image URL: ${imageUrl}`);
}

// Example of how you can use this:
fetch(petsApiUrl)
  .then(response => response.json())
  .then(data => {
    if (data && data.pets) {
      data.pets.forEach(pet => addPetCard(pet));
    }
  })
  .catch(error => console.error('Error fetching pet data:', error));
