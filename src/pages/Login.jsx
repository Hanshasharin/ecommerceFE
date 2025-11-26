import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://ecommercebe-b90j.onrender.com/api/login",
        { email, password },
        { withCredentials: true }
      );

      navigate("/product"); // redirect after success
    } catch (err) {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
          >
            Login
          </button>
        </form>

        <div className="flex items-center mt-4">
          <div className="border-b w-full"></div>
          <span className="px-2 text-gray-500">or</span>
          <div className="border-b w-full"></div>
        </div>

        {/* Google Login */}
        <a
          href="https://ecommercebe-b90j.onrender.com/api/google"
          className="w-full border py-2 mt-4 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-100"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            className="w-5"
            alt="Google"
          />
          Continue with Google
        </a>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/" className="text-indigo-600 font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
