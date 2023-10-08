import React, { useRef } from "react";
import lang from "../../utils/langConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../../utils/openai";
import { API_OPTION } from "../../utils/constant";
import { addGptMovieResult } from "../../redux/slice/gptSlice";

const GptSearchBar = () => {
  const selectLang = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const dispatch = useDispatch();

  // Search Movies in TMDB

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTION
    );
    const json = await data.json();
    console.log(json.results);
    return json.results;
  };

  const handleSearch = async () => {
    console.log(searchText.current.value);
    const gptQuery =
      "Act as a movie Recommendation system and suggest some movie for the query: " +
      searchText.current.value +
      " only give me names of movie, comma seperated.";

    // const result = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: searchText.current.value }],
    //   model: "gpt-3.5-turbo",
    // });

    // console.log(result.choices?.[0]?.message.content.split(","));
    const MOVIES = [
      "Sholay",
      "Padosan",
      "Chupke Chupke",
      "Angoor",
      "Amar Akbar Anthony",
    ];
    // const gptMovies = result.choices?.[0]?.message.content.split(",");
    const gptMovies = MOVIES;
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  return (
    <div className="search-bar">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          ref={searchText}
          placeholder={lang[selectLang].searchPlaceholder}
        />
        <button className="" onClick={handleSearch}>
          {lang[selectLang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
