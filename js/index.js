const URL = 'http://localhost:3000/tweets'

// retrieve data from twitter api
const getTwitterData = () => {
    const url = 'http://localhost:3000/tweets?query=beyonce&max_results=10';

    fetch(url)
    .then((response) => {
        return response.json();
    }).then((data) => {
            console.log(data);
    }).catch((err) => {
        console.log('Fetch Error :-S', err);
    });
}