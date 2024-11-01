const headers = new Headers({
    "User-Agent": "Booki/1.0 (gui.car.dev@gmail.com)"
});
const options = {
    method: 'GET',
    headers: headers
};

const getCover = (cover) => {
    return `https://covers.openlibrary.org/b/id/${cover}-M.jpg`;
};

const getIsbn = (isbn) => {
    const isbn10 = [];
    let i = 0;
    while (i < 10 && isbn !== "unknown" ) {
        isbn10.push(`https://openlibrary.org/isbn/${isbn[i]}.json` || "unknown");
        i++;
    };
    return isbn10;
};

const getDescriptionGenetetor = (title, author, publishYear, subject) => {
    const description = `the book ${title} is a work of ${author} published in ${publishYear}.`;
    return description;
};

const getDescriptionWiki = async (title, author, publishYear, subject) => {
    const urlWiki = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    const response = await fetch(urlWiki, options);
    const data = await response.json();
    
    if (!data.description) { 
        return getDescriptionGenetetor();
    } else if (data.description.includes("novel" || "novella" || "book" || "romance")) {
        return data.extract;
    } else {
        return getDescriptionGenetetor(title, author, publishYear, subject);
    };
};

const getBookOpen = async (urlOpen) => {
    const response = await fetch(urlOpen, options);
    const data = await response.json();
    const info = data.docs;
    const bookDetails = [];

    for (let i of info) {
        let author = i.author_name || "unknown";
        let publishYear = i.first_publish_year || "unknown";
        let publisher = i.publisher[0] || "unknown";
        let bookDetail = {
            author: author,
            cover: getCover(i.cover_i) || "unknown",
            publishYear: publishYear,
            isbn: getIsbn(i.isbn) || "unknown",
            language: i.language || "unknown",
            title: i.title || "unknown",
            pages: i.number_of_pages_median || "unknown",
            publisher: publisher,
            subject: i.subject || "unknown",
            ratingCount: i.ratings_count || "unknown",
            ratingAverage: i.ratings_average || "unknown",
            description: await getDescriptionWiki(i.title, author, publishYear, i.subject)
          };
          bookDetails.push(bookDetail);
    };  
    return bookDetails;
};

const search = async (type, nameSearch, sort, language, date, limit) => {
    let urlOpen = `https://openlibrary.org/search.json?${type}=${nameSearch}&sort=${sort}&language=${language}&first_publish_year=${date}&limit=${limit}`;
    
    return await getBookOpen(urlOpen);
};

module.exports = { search };