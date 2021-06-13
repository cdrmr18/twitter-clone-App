const URL = 'http://localhost:3000/tweets'

const searchIcon = document.getElementById('searchIcon');

let nextPageUrl = null;

const onEnter = (e) => {
    if (e.key === "Enter") {
        getTwitterData();
    }
}

const toNextPage = () => {
    if (nextPageUrl) {
        getTwitterData();
    }
}
// retrieve data from twitter api
const getTwitterData = () => {
    const query = document.getElementById('user-search-input').value;
    if (!query) return;
    const encodedQuery = encodeURIComponent(query);
    let url = `${URL}?query=${encodedQuery}&max_results=10&lang=en`;
    
    if (nextPageUrl) {
        url = `${url}&next_token=${nextPageUrl}`;
    }
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((data) => {
        buildTweets(data.data);
        console.log(data)
        saveNextPage(data.meta);
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

const saveNextPage = (metaData) => {
    if (metaData.next_token) {
        nextPageUrl = `${metaData.next_token}`;
    } else {
        nextPageUrl = null;
    }
}

const setTrendSearch = (e) => {
    document.getElementById('user-search-input').value = e.innerText;
    getTwitterData();
}
searchIcon.addEventListener('click', getTwitterData);