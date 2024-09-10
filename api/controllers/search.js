const headers = new Headers({
    "User-Agent": "Booki/1.0 (gui.car.dev@gmail.com)"
});
const options = {
    method: 'GET',
    headers: headers
};

const getBookOpen = async (urlOpen) => {
    const response = await fetch(urlOpen, options);
    const data = await response.json();
    const info = data.docs;

    for (let i of info) {
        console.log(i.author_name[0]);
    };

    return info;
}

const search = async (book) => {
    let urlOpen = `https://openlibrary.org/search.json?q=${book}&limit=1`;
    
    return await getBookOpen(urlOpen);
};

module.exports = { search };