import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const { setUser } = useContext(UserContext);
  async function handlelogin(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post(
        "user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert("Login Failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={handlelogin}>
          <input
            className="w-full my-2 py-2 px-3 rounded-xl border border-black"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            className="w-full  my-2 py-2 px-3 rounded-xl border border-black"
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="w-full border py-2 my-2 rounded-xl bg-red-600">
            Login
          </button>
          <div>
            Don't have an account yet?
            <Link to="/register" className="underline ml-2">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
