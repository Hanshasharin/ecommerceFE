import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: 5, review: "" });

  const getProduct = async () => {
    const res = await axios.get(`http://localhost:3000/api/product/detail/${id}`);
    setProduct(res.data);
  };

  const getReviews = async () => {
    const res = await axios.get(`http://localhost:3000/api/review/list/${id}`);
    setReviews(res.data);
  };

  useEffect(() => {
    getProduct();
    getReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:3000/api/review/add",
      { productId: id, rating: form.rating, review: form.review },
      { withCredentials: true }
    );
    setForm({ rating: 5, review: "" });
    getReviews();
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/cart/add",
        { productId: id },
        { withCredentials: true }
      );
      alert("Added to cart");
    } catch {
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 flex justify-center">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-8">
        
        {/* Product Section */}
        <div className="flex flex-col md:flex-row gap-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-80 rounded-xl shadow-md"
          />

          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-lg font-semibold mt-3 text-indigo-600">₹ {product.price}</p>
            <p className="text-sm text-gray-500">{product.category}</p>

            <button
              onClick={handleAddToCart}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow transition-all"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>

        {/* Review Form */}
        <h2 className="text-2xl font-semibold mt-10">Write a Review</h2>
        <form onSubmit={handleSubmit} className="mt-4 p-5 bg-gray-50 rounded-xl space-y-4 shadow">
          <div>
            <label className="font-semibold">Rating</label>
            <select
              className="border p-2 rounded w-full"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            >
              <option value="1">⭐ 1 – Poor</option>
              <option value="2">⭐⭐ 2 – Fair</option>
              <option value="3">⭐⭐⭐ 3 – Good</option>
              <option value="4">⭐⭐⭐⭐ 4 – Very Good</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 – Excellent</option>
            </select>
          </div>

          <textarea
            className="w-full border p-3 rounded h-28"
            placeholder="Write your experience..."
            value={form.review}
            onChange={(e) => setForm({ ...form, review: e.target.value })}
          />

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">
            Submit Review
          </button>
        </form>

        {/* Reviews Section */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">Customer Reviews</h2>

        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        )}

        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="bg-gray-50 border rounded-xl p-5">
              <p className="font-bold text-indigo-600">{r.rating} ⭐</p>
              <p className="mt-1">{r.review}</p>
              <p className="text-sm text-gray-500 mt-1">By {r.userId?.email}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
