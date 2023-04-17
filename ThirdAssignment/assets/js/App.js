(async function () {
    let loader = document.getElementById('loader');
    const response = await fetch('./assets/API/data.json');
    const result = await response.json();
    let display_movie = document.getElementById('movies_listing');

    let movie_genre = document.getElementById('genre');
    let movie_year = document.getElementById('Year');
    let movie_language = document.getElementById('language');
    let movie_rating = document.getElementById('rating');

    // display search item
    const displaySearch = (data) => {
        display_movie.innerHTML = '';
        data.forEach(async (movie, index) => {
            const item = await `
            <tr key=${index}>
            <td>${index + 1}</td>
            <td>
                <div class='d-flex align-items-center'>
                    <img src=${`https://image.tmdb.org/t/p/w45/${movie.poster_path}`} alt=${movie.poster_path}>
                    <div class='discription ps-3'>
                        <h6 class='movie_title text-primary mb-1'>${movie.title} <span class="rating">${movie.vote_average}</span></h6>
                        <span class='badge text-bg-primary me-2 px-3'>${movie.certification}</span>
                        <span class='genre'>${movie.genres.join(', ')}</span>
                        <span class='runtime'>${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min</span>
                    </div>
                </div>
            </td>
            <td>${movie.release_date.substr(0, 4)}</td>
        </tr>
            `;
            display_movie.innerHTML += item;
        })
    }

    const search_Function = async () => {
        let genre = movie_genre.value;
        let year = movie_year.value;
        let language = movie_language.value;
        let rating = movie_rating.value;

        // filter array
        const filtered_movie = result.filter(function (result) {
            return (result.vote_average == rating || result.original_language == language || result.release_date.includes(year) || result.genres.includes(genre));
        });
        displaySearch(filtered_movie)
    }
    document.getElementById('search_movie_form').addEventListener('change', search_Function);

})();