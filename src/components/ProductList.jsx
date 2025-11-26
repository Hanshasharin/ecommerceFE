import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:3000/api/product/list");
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/api/product/delete?id=${id}`);
    getProducts(); // refresh after delete
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        
        <Link
          to="/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-xl p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-60 object-cover rounded-lg transition-transform duration-300 hover:scale-110"
              />
            </div>

            <h2 className="text-xl font-semibold mt-3">{p.name}</h2>
            <p className="text-gray-600">{p.category}</p>
            <p className="font-bold mt-1">₹ {p.price}</p>

            <div className="flex justify-between mt-4">
              <Link
                className="text-indigo-600 font-semibold hover:underline"
                to={`/product/${p._id}`}
              >
                View
              </Link>

              <button
                onClick={() => deleteProduct(p._id)}
                className="text-red-600 font-semibold hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
