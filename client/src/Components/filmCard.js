import React from "react";

export const FilmCard = ({movie}) => {
    console.log(movie)

    const title = movie.Title;

    return (
        <div id="filmCard">
            <h1>{movie.Title}</h1>
            <div id ="filmDetails">
            <img src={movie.Poster} />
            <ul>
                <li><span class="detailSelect">Year:</span>  {movie.Year}</li>
                <li><span class="detailSelect">Rating:</span>  {movie.Rated}</li>
                <li><span class="detailSelect">Plot:</span>  {movie.Plot}</li>
            </ul>
            </div>
        </div>
    );
    }