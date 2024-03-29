import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage";
import AddMoviePage from "./pages/AddMoviePage";
import SelectedMoviePage from "./pages/SelectedMoviePage";

axios.defaults.baseURL = "http://localhost:4000/api/v1/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/addmovie" element={<AddMoviePage />} />
          <Route path="/update/:id" element={<AddMoviePage />} />
          <Route path="/movies/:id" element={<SelectedMoviePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
