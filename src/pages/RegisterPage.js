import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");

  async function register(ev) {
    ev.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/user/register", {
        name,
        email,
        password,
      });
      alert("Registration Successful. You can now login !");
      setRedirect(true);
    } catch (error) {
      alert("Registration FAILED");
    }
  }
  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto " onSubmit={register}>
          <input
            className="w-full my-2 py-2 px-3 rounded-xl border border-black"
            type="username"
            placeholder="username"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
            Register
          </button>
          <div>
            Already have an account?
            <Link to="/login" className="underline ml-2">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
