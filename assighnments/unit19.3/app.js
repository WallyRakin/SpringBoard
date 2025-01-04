// app.js 

// Select DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gifContainer = document.getElementById('gif-container');
const removeGifsButton = document.getElementById('remove-gifs');

// Event Listener for Form Submission
searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const query = searchInput.value.trim();

    if (query === '') {
        alert('Please enter a search term.');
        return;
    }

    fetchGif(query);
    searchForm.reset(); // Clear the input field
});

// Event Listener for Remove GIFs Button
removeGifsButton.addEventListener('click', function () {
    gifContainer.innerHTML = ''; // Clear all GIFs
});

// Function to Fetch GIF from Giphy API
function fetchGif(query) {
    const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(query)}&limit=1&offset=0&rating=g&lang=en`;

    axios.get(url)
        .then(function (response) {
            console.log(response.data);

            if (response.data.data.length === 0) {
                alert('No GIFs found for this search term.');
                return;
            }

            const gifUrl = response.data.data[0].images.fixed_height.url;
            appendGif(gifUrl);
        })
        .catch(function (error) {
            console.error('Error fetching GIF:', error);
            alert('An error occurred while fetching the GIF. Please try again later.');
        });
}

// Function to Append GIF to the Page
function appendGif(gifUrl) {
    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = 'Giphy GIF';
    img.style.margin = '10px';
    gifContainer.appendChild(img);
}
