// =======================
// *** TODO / ADD ONS ***
// =======================

/**
 * Provide details of each movie when clicked (this requires a new search based on imdb id)
 * Add a search history?
 * Need proper error handling
 * What to do for repeat results?
 */


const searchBtn = document.querySelector('.search__btn');
const resultsTitle = document.querySelector('.results__title');
const resultsContainer = document.querySelector('.results__container');
const resultsContent = document.querySelector('.results__content');


const _key = '&apikey=f9dc5e96';

let query = document.querySelector('.search__field');

// this should be in a config folder
const baseURL = new URL('https://www.omdbapi.com/?s=');

function clearExisting () {
    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }

    resultsTitle.textContent = '';
    query.value = '';
};

// Clear page when searching new term
query.onfocus = clearExisting;


// Search for new keyword
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();    

     if(query.value === undefined ) {
         return;
     };
 
    let term = `${baseURL}${query.value.toLowerCase()}${_key}`;

    resultsTitle.insertAdjacentHTML('afterbegin', `<h2>Search Results for ' ${query.value.toLowerCase()} ' </h2>`);

const getJSON = async function (url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        return data;
    } catch (err) {
        console.log(err); // may need to throw this error later
    }
};


const loadMovie = async function () {
    try {
        const data = await getJSON(term);

           for(let i = 0; i <= 10; i++) {
               let title = data.Search[i].Title;
               let year = data.Search[i].Year;
               let id = data.Search[i].imdbID;
               let type = data.Search[i].Type;
               let poster = data.Search[i].Poster;

               if (poster === 'N/A') { 
                   poster = `'https://picsum.photos/300/458'`;
               };

               const markup = 
                `
                <div class="results__content">
                    <figure class="results__poster">
                        <img src="${poster}" alt="${title}" />
                    </figure>
                    <div class="results__data">
                        <h4 class="results__title">${title}</h4>
                        <p class="results__year">${year}</p>
                    </div>
                </div>
                `;
                //https://picsum.photos/300/458  
            

                resultsContainer.insertAdjacentHTML('afterbegin', markup);

                //if poster === 'N/A' set placeholder
           }           
    } catch (err) {
        // console.error(`${err}`);
    }
} 
loadMovie();

// ****** END SEARCH CLICK LISTENER *******
});




