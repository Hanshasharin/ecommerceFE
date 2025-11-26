import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/product/create", form);
    navigate("/product");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Add Product</h1>

        <input
          name="name"
          placeholder="Product Name"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Add Product
        </button>
      </form>
    </div>
  );
}
