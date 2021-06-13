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
        getTwitterData(true);
    }
}
// retrieve data from twitter api
const getTwitterData = (nextPage=false) => {
    console.log(nextPage)
    const query = document.getElementById('user-search-input').value;
    if (!query) return;
    const encodedQuery = encodeURIComponent(query);
    let url = `${URL}?query=${encodedQuery}&max_results=10&lang=en`;
    
    if (nextPage && nextPageUrl) {
        url = `${url}&next_token=${nextPageUrl}`;
    }
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((data) => {
        buildTweets(data.data, nextPage);
        console.log(data)
        saveNextPage(data.meta);
    })
}

const buildTweets = (tweets, nextPage) => {
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

   if (nextPage) {
        document.querySelector('.tweets-list').insertAdjacentHTML('beforeend', twitterContent);
   } else {
        document.querySelector('.tweets-list').innerHTML = twitterContent;
   }  
}

const saveNextPage = (metaData) => {
    if (metaData.next_token) {
        nextPageUrl = `${metaData.next_token}`;
        document.querySelector('.next-page-container').style.display = 'flex';
    } else {
        nextPageUrl = null;
    }
}

const setTrendSearch = (e) => {
    document.getElementById('user-search-input').value = e.innerText;
    getTwitterData();
}
searchIcon.addEventListener('click', getTwitterData);