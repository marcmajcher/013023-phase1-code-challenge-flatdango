const filmsAPI = 'http://localhost:3000/films';
const filmsUl = el('films');

let currentFilm;

fetch(filmsAPI)
    .then(res => res.json())
    .then(movies => {
        renderFilmsMenu(movies);
        showMovieInfo(movies[0]);
    });

el('buy-ticket').addEventListener('click', () => {
    if (currentFilm.tickets_sold < currentFilm.capacity) {
        currentFilm.tickets_sold += 1;
        renderTicketsRemaining(currentFilm)
    }
});

function renderTicketsRemaining(movie) {
    el('ticket-num').textContent = parseInt(movie.capacity) - parseInt(movie.tickets_sold);
}

function renderFilmsMenu(films) {
    filmsUl.innerHTML = '';
    films.forEach(film => {
        const filmLi = document.createElement('li');
        filmLi.textContent = film.title;
        filmLi.classList.add('film');
        filmLi.classList.add('item');
        filmsUl.append(filmLi);

        filmLi.addEventListener('click', () => showMovieInfo(film));
    });
}

function showMovieInfo(movie) {
    el('title').textContent = movie.title;
    el('runtime').textContent = movie.runtime;
    el('film-info').textContent = movie.description;
    el('showtime').textContent = movie.showtime;
    el('poster').src = movie.poster;
    currentFilm = movie;
    renderTicketsRemaining(movie);
}

function el(id) {
    return document.getElementById(id);
}
