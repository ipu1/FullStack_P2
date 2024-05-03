// Define the base URL for your backend API
const BASE_URL = 'http://localhost:3000/api/songs/';

// Function to fetch all songs from the backend API
async function fetchAllSongs() {
  try {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
}

// Function to display songs in the UI
function displaySongs(songs) {
  const songsContainer = document.getElementById('songs-container');
  songsContainer.innerHTML = '';

  songs.forEach(song => {
    const songElement = document.createElement('div');
    songElement.classList.add('song');
    songElement.innerHTML = `
      <h3>${song.title}</h3>
      <p>Artist: ${song.artist}</p>
      <p>Album: ${song.album}</p>
      <p>Genre: ${song.genre}</p>
      <p>Release Year: ${song.releaseYear}</p>
    `;
    songsContainer.appendChild(songElement);
  });
}

// Function to initialize the application
async function init() {
  try {
    const songs = await fetchAllSongs();
    displaySongs(songs);
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const requestData = {};
  formData.forEach((value, key) => {
    requestData[key] = value;
  });

  try {
    const response = await fetch(`${BASE_URL}add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    const data = await response.json();
    console.log('Song added:', data);
    init(); // Reload songs after adding a new one
  } catch (error) {
    console.error('Error adding song:', error);
  }
}

// Call the init function when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Listen for form submission
const addSongForm = document.getElementById('addSongForm');
addSongForm.addEventListener('submit', handleFormSubmit);