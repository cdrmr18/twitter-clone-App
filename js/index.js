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
    const url = `${URL}?query=${encodedQuery}&max_results=10&lang=en`;

    if (!query) return;
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((data) => {
        buildTweets(data.data);
    })
}

const buildTweets = (tweets) => {
    let twitterContent = "";
    tweets.map((tweet) => {
        twitterContent += `
            <div class="tweet-container">
                        <div class="tweet-text-container">
                                ${tweet.text}
                        </div>

                        <div class="tweet-date-container">
                            20 hours ago
                        </div>
                    </div>
        `;
    });

    
   document.querySelector('.tweets-list').innerHTML = twitterContent;
}

const setTrendSearch = (e) => {
    document.getElementById('user-search-input').value = e.innerText;
    getTwitterData();
}
searchIcon.addEventListener('click', getTwitterData);