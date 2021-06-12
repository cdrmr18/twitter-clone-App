const URL = 'http://localhost:3000/tweets'

const searchIcon = document.getElementById('searchIcon');

const onEnter = (e) => {
    if (e.key === "Enter") {
        getTwitterData();
    }
}
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
        buildTweets(data);
    }).catch((err) => {
        console.log('Fetch Error :-S', err);
    });
}

const buildTweets = (tweets) => {
    tweets.map();
// - Use string literals to replace html with the text from each tweet
// - Replace html content inside `.tweets-list`

}

searchIcon.addEventListener('click', getTwitterData);