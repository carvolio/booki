const search = require('./search');

const recommen = async (title, subjects, author) => {
    const resultAuthors = (await search.search('author', author, '', '', '', 7)).slice(0, 7);

    const numeroAleatorio = Math.floor(Math.random() * 7);
    const resultSubjects = await search.search('subject', subjects[numeroAleatorio], '', '', '', 7);
    
    const resultArry = [...new Set([...resultSubjects, ...resultAuthors].map(JSON.stringify))].map(JSON.parse);
    
    const resultSort = [];
    for (let j in resultArry) {

        if (resultArry[j].title != title) {
            let result = {
                title: resultArry[j].title,
                author: resultArry[j].author,
                publisher: resultArry[j].publisher,
                publishYear: resultArry[j].publishYear,
                cover: resultArry[j].cover
            };
            resultSort.push(result);
        };

    };
    
    return resultSort;
};

module.exports = { recommen };