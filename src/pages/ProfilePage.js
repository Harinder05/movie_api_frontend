import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getInfo = () => {
      axios
        .get("movies/user-movies")
        .then((response) => {
          setMovies(response.data.movies);
        })
        .catch((error) => {
          console.error("Error fetching user movies:", error);
        });
    };

    getInfo();
  }, []);

  async function logout() {
    await axios.post("user/logout");
    setRedirect("/");
    setUser(null);
  }

  async function deleteMovie(id) {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this movie?"
      );

      if (confirmed) {
        const response = await axios.delete(`/movies/${id}`);

        if (response.status === 200) {
          alert("Movie deleted successfully.");
          window.location.reload();
        } else {
          alert("Could not update movie. Please try again later.");
        }
      }
    } catch (error) {
      alert("Could not delete the movie. Please try again later.");
    }
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="text-center mx-auto">
      <b>Account details:</b> <br />
      Username: <b>{user.name}</b> <br />
      Email: <strong>{user.email}</strong>
      <br />
      <button
        onClick={() => setRedirect("/addmovie")}
        className="ml-3 bg-red-600 text-white rounded-full border mt-8 py-2 px-4"
      >
        Add Movie
      </button>
      <br />
      <br />
      <b>Movies added from this account:</b> <br />
      {movies.length > 0 &&
        movies.map((movie) => (
          <div className="flex items-center cursor-pointer mt-8  bg-gray-200 p-4 rounded-2xl">
            <div className="grow-0 shrink flex w-32 h-32 bg-gray-300 ">
              <img
                src={`http://localhost:4000/uploads/${movie.photo}`}
                className="w-32 h-32 object-cover"
                alt={movie.title}
              />
            </div>

            <div className="text-center w-full ml-4 object-cover">
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <p className="text-sm mt-2">{movie.description}</p>
            </div>

            <div className="w-19">
              <button onClick={() => setRedirect("/update/" + movie._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mb-10 hover:text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <button onClick={() => deleteMovie(movie._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 hover:text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      <button
        onClick={logout}
        className="ml-5 bg-red-600 text-white rounded-full border mt-8 py-2 px-4"
      >
        Logout
      </button>
    </div>
  );
}
