const headers = new Headers({
    "User-Agent": "Booki/1.0 (gui.car.dev@gmail.com)"
});
const options = {
    method: 'GET',
    headers: headers
};

const bookDetails = [];

const getDescriptionGenetetor = () => {
    return "blá blá blá"
};

const getDescriptionWiki = async (title) => {
    const urlWiki = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    const response = await fetch(urlWiki, options);
    const data = await response.json();
    
    if (!data.description) { 
        return getDescriptionGenetetor();
    } else if (data.description.includes("novel" || "novella" || "book" || "romance")) {
        return data.extract;
    } else {
        return getDescriptionGenetetor();
    };
};

const getBookOpen = async (urlOpen) => {
    const response = await fetch(urlOpen, options);
    const data = await response.json();
    const info = data.docs;

    for (let i of info) {
        const bookDetail = {
            author: i.author_name[0],
            cover: i.cover_i,
            publishYear: i.first_publish_year,
            isbn: i.isbn[0],
            language: i.language,
            title: i.title,
            pages: i.number_of_pages_median,
            publisher: i.publisher[0],
            subject: i.subject,
            ratingCount: i.ratings_count,
            ratingAverage: i.ratings_average,
            description: await getDescriptionWiki(i.title)
          };
          bookDetails.push(bookDetail);
    };
    
    console.log(bookDetails[0]);    
    return bookDetails;
};

const search = async (book) => {
    let urlOpen = `https://openlibrary.org/search.json?q=${book}&limit=3`;
    
    return await getBookOpen(urlOpen);
};

module.exports = { search };