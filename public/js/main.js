// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault(); // prevent default form submission

  const formData = new FormData(event.target);
  const requestData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(BASE_URL + 'add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Failed to add song');
    }

    // If successful, re-fetch and display all songs
    init();
  } catch (error) {
    console.error('Error adding song:', error);
  }
}

// Add event listener to form
const addSongForm = document.getElementById('addSongForm');
addSongForm.addEventListener('submit', handleFormSubmit);