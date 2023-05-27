import { useState, useContext, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function AddMoviePage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState([]);
  const [releaseDate, setReleaseDate] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/movies/${id}`).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setDescription(data.description);
      setPhoto(data.photo);
      setReleaseDate(data.releaseDate);
      setDirector(data.director);
      setCast(data.cast);
    });
  }, [id]);

  async function addNewMovie(ev) {
    ev.preventDefault();
    try {
      if (id) {
        const response = await axios.put(`/movies/${id}`, {
          title,
          description,
          photo: photo,
          releaseDate,
          director,
          cast,
        });

        if (response.status === 201) {
          alert("Movie updated successfully");
          setRedirect(true);
        } else {
          alert("Could not update movie. Please try again later.");
        }
      } else {
        const response = await axios.post("/movies", {
          title,
          description,
          photo: photo,
          releaseDate,
          director,
          cast,
        });

        if (response.status === 201) {
          alert("Movie added successfully");
          setRedirect(true);
        } else {
          alert("Could not add movie. Please try again later.");
        }
      }
    } catch (error) {
      if (error.response.status === 409) {
        alert("Movie already exists in the database");
      } else {
        console.error(error);
        alert(
          "An error occurred while adding/updating the movie. Please try again later."
        );
      }
    }

    //setTitle("");
    //setDescription("");
    //setPhoto([]);
    //setReleaseDate("");
    //setDirector("");
    //setCast("");
  }

  const handleDateChange = (ev) => {
    const inputDate = ev.target.value;
    const isValidDate = !isNaN(new Date(inputDate));

    if (isValidDate) {
      setReleaseDate(inputDate);
    } else {
      setReleaseDate("");
    }
  };

  function uploadPhoto(ev) {
    const files = ev.target.files;

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("movies/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const responseData = response.data.data;
        setPhoto([...photo, ...responseData]);
      });
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    setPhoto([...photo.filter((photo) => photo !== filename)]);
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return !user ? (
    <Navigate to="/login" />
  ) : (
    <div>
      <div>
        <form onSubmit={addNewMovie}>
          <h2 className="text-2xl mt-4 ml-2 w-full">Title</h2>
          <input
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            type="text"
            placeholder="Add name of the movie"
          />
          <h2 className="text-2xl mt-4 ml-2 ">Description</h2>
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            className="resize-none"
            rows="5"
            placeholder="Add description of movie"
          />

          <h2 className="text-2xl mt-4 ml-2 mb-2">Front Cover</h2>

          <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {photo.length > 0 &&
              photo.map((photoPath, index) => (
                <div className="h-64 w-45 flex relative" key={index}>
                  <img
                    className="rounded-2xl w-full"
                    src={"http://localhost:4000/uploads/" + photoPath}
                    alt=""
                  />
                  <button
                    onClick={(ev) => removePhoto(ev, photoPath)}
                    className="cursor-pointer absolute bottom-1 right-1 text-white bg-gray-400 rounded-2xl py-2 px-3"
                  >
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
              ))}
            <label className="h-64 cursor-pointer flex items-center gap-1 justify-center border border-gray-400 bg-transparent rounded-2xl p-2 text-2xl ">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={uploadPhoto}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                />
              </svg>
            </label>
          </div>

          <h2 className="text-2xl mt-4 ml-2 ">Release Date</h2>
          <input
            value={
              releaseDate
                ? new Date(releaseDate).toISOString().substring(0, 10)
                : ""
            }
            onChange={handleDateChange}
            type="date"
            placeholder="Release Date"
          />

          <h2 className="text-2xl mt-4 ml-2">Director</h2>
          <input
            value={director}
            onChange={(ev) => setDirector(ev.target.value)}
            type="text"
            placeholder="Add name of movie director"
          />
          <h2 className="text-2xl mt-4 ml-2 ">Cast</h2>
          <input
            value={cast}
            onChange={(ev) => setCast(ev.target.value)}
            type="text"
            placeholder="Add cast of movie"
          />
          <div className="flex justify-center">
            <button className="text-xl mt-5 bg-gray-300 hover:bg-red-600 py-3 px-5 rounded-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
