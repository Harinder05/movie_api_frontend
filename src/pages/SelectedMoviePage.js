import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SelectedMoviePage() {
  const [movie, setMovie] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return "Movie not found";
    }
    axios.get(`/movies/${id}`).then((res) => {
      const movieData = res.data;
      const releaseDate = new Date(movieData.releaseDate);

      const year = releaseDate.getFullYear();
      const month = releaseDate.getMonth() + 1;
      const day = releaseDate.getDate();

      // Movie with updated release date
      const updatedMovie = {
        ...movieData,
        releaseDate: `${day}-${month}-${year}`,
      };

      setMovie(updatedMovie);
    });
  }, [id]);

  return (
    <div className="px-3">
      <button onClick={() => navigate(-1)} className="flex gap-2 py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>{" "}
        Go Back
      </button>

      <h1 className="text-5xl mb-4">{movie.title}</h1>

      <img
        className=" h-96"
        src={"http://localhost:4000/uploads/" + movie.photo}
        alt="Movie frontcover"
      />

      <div className="border-b-2 border-gray-500 py-3">{movie.description}</div>
      <div className="border-b-2 border-gray-500 py-3">
        <strong>Director:</strong> {movie.director}
      </div>
      <div className="border-b-2 border-gray-500 py-3">
        <strong>Release Date:</strong> {movie.releaseDate}
      </div>
      {movie.createdBy && (
        <div className="py-3">
          <strong>Added by:</strong> {movie.updatedBy.name}
        </div>
      )}
    </div>
  );
}
