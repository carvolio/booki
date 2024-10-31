const headers = new Headers({
    "User-Agent": "Booki/1.0 (gui.car.dev@gmail.com)"
});
const options = {
    method: 'GET',
    headers: headers
};

const editionCovers = (cover) => {
    // colocar is se cover for undefined.....
    return `https://covers.openlibrary.org/b/id/${cover}-M.jpg`;
};

const edition = async (editions) => {
    const resultEdition = [];
    for (let i in editions) {
        let response = await fetch(editions[i], options);
        let data = await response.json();

        let dataSort = {
            title: data.title,
            publishers: data.publishers[0],
            publishDate: data.publish_date,
            covers: editionCovers(data.covers),
        };

        resultEdition.push(dataSort);
    };
    return resultEdition;
};

module.exports = { edition };