const URL = 'http://localhost:3000/tweets'

const searchIcon = document.getElementById('searchIcon');

// retrieve data from twitter api
const getTwitterData = () => {
    const query = document.getElementById('user-search-input').value;
    const encodedQuery = encodeURIComponent(query);
    const url = `${URL}?query=${encodedQuery}&max_results=10`;

    if (!query) return;
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((data) => {
            console.log(data);
    }).catch((err) => {
        console.log('Fetch Error :-S', err);
    });
}

searchIcon.addEventListener('click', getTwitterData);