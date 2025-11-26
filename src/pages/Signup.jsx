import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://ecommercebe-b90j.onrender.com/api/signup", form, {
        withCredentials: true,
      });

      alert(res.data.message);
      navigate("/login");   // redirect after successful signup

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

         

          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center mt-4">
          <div className="border-b w-full"></div>
          <span className="px-2 text-gray-500">or</span>
          <div className="border-b w-full"></div>
        </div>

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
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}
