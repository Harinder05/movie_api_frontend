import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function IndexPage() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllMovies();
  }, [currentPage, resultsPerPage]);

  const getAllMovies = () => {
    axios
      .get(`/movies?page=${currentPage}&limit=${resultsPerPage}`)
      .then((res) => {
        const { movies: data, totalCount } = res.data;
        setMovies(data);
        setTotalPages(Math.ceil(totalCount / resultsPerPage));
      });
  };

  const handleDatabaseSearch = () => {
    if (searchInput.trim() !== "") {
      setIsLoading(true);
      axios.get(`/movies/db/search/${searchInput}`).then((res) => {
        const { movies: data, totalCount } = res.data;
        setSearchResults(data);
        setTotalPages(Math.ceil(totalCount / resultsPerPage));
        setIsLoading(false);
      });
    }
  };

  const handleApiSearch = () => {
    if (searchInput.trim() !== "") {
      setIsLoading(true);
      axios.get(`/movies/api/search/${searchInput}`).then((res) => {
        const { movies: data, totalCount } = res.data;

        setSearchResults(data);
        setTotalPages(Math.ceil(totalCount / resultsPerPage));
        console.log(totalPages);
        setIsLoading(false);
      });
    }
  };

  const displayMovies = searchResults.length > 0 ? searchResults : movies;

  const handlePreviousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const handleResultsPerPageChange = (ev) => {
    const newResultsPerPage = parseInt(ev.target.value);
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-2/3 mt-8 mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search movies..."
          className="px-4 py-2 border border-gray-300 rounded-2xl"
          value={searchInput}
          onChange={(ev) => setSearchInput(ev.target.value)}
        />
        <button
          className="ml-2 px-4  bg-red-600 text-white rounded-2xl"
          onClick={handleDatabaseSearch}
        >
          Search&nbsp;Database
        </button>
        <button
          className="ml-2 px-4 py-2 bg-red-600 text-white rounded-2xl"
          onClick={handleApiSearch}
        >
          Search&nbsp;API
        </button>
      </div>

      {isLoading && <div className="text-center font-bold">Loading...</div>}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {displayMovies.length > 0 ? (
          displayMovies.map((movie) => (
            <Link
              to={`/movies/${movie._id}`}
              className="bg-gray-300 h-auto p-4 hover:text-red-600 rounded-2xl min-w-[300px]"
              key={movie._id || movie.id}
            >
              <div className="w-full h-96 bg-gray-300 relative">
                <img
                  src={
                    movie.image
                      ? movie.image
                      : `http://localhost:4000/uploads/${movie.photo}`
                  }
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  alt={movie.title}
                />
              </div>
              <div className="mt-2 flex justify-center font-sans cursor-pointer text-xl">
                {movie.title}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-500">
            {searchResults.length > 0 ? "No search results" : "No movies"}
          </div>
        )}
      </div>
      <div className="mt-10 gap-3 flex justify-center">
        <button
          className={`px-4 py-2 rounded-2xl ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-red-600 text-white"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2 px-4 py-2 rounded-2xl border">{currentPage}</span>
        <button
          className={`px-4 py-2 rounded-2xl ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-red-600 text-white"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="mt-4 flex justify-center ">
        <span>Show results per page: </span>
        <select
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
          value={resultsPerPage}
          onChange={handleResultsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
}
