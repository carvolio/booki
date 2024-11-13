const showcase = document.getElementById('showcase');
const books = document.querySelector('books');


// books.forEach(e => {
//     console.log(e);
//     showcase.innerHTML += `
//     <div>
//         <img src="${e.cover}" alt="">
//         <h3>${e.title}</h3>
//     </div>
//     `
// });

// var i = 0;
//                 while (i < 9) {
//                     if (i == 0 || i == 1 || i == 2) {
//                         showcase.innerHTML += `
//                         <div id="showcaseBook[i]">
//                             <img src=<%= books[i].cover %> alt="">
//                             <span><%= books[i].title %></span>
//                             <span><%= books[i].description %></span>
//                         </div>`;
//                     } else {
//                         showcase.innerHTML += `
//                         <div id="showcaseBook[i]" style="displey: none">
//                             <img src=<%= books[i].cover %> alt="">
//                             <span><%= books[i].title %></span>
//                             <span><%= books[i].description %></span>
//                         </div>`;
//                     }
//                     i++;
//                 }