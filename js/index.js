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
    const url = `${URL}?query=${encodedQuery}&max_results=10&lang=en&tweet.fields=text,attachments&expansions=attachments.media_keys&media.fields=url,preview_image_url&user.fields=name,username`;

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
                        <div class="tweet-user-info">
                            <div class="tweet-user-avatar">
                                <img src="https://images.unsplash.com/photo-1542513217-0b0eedf7005d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80" alt="avatar" class="avatar">
                            </div>
                            <div class="tweet-user-name-container">
                                <div class="tweet-user-fullname">
                                    Yonce Knowledge
                                </div>
                                <div class="tweet-user-username">
                                    @yonce
                                </div>
                            </div>
                        </div>

                        <div class="tweet-images-container">
                            <img src="https://images.unsplash.com/photo-1593878024377-b38927fc7689?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBnaXJsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60" alt="tweet image">
                        </div>

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

searchIcon.addEventListener('click', getTwitterData);