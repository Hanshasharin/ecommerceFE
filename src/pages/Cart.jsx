import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();


  const fetchCart = async () => {
    const res = await axios.get("https://ecommercebe-b90j.onrender.com/api/cart", {
      withCredentials: true,
    });
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const increase = async (productId) => {
    await axios.put("https://ecommercebe-b90j.onrender.com/api/cart/increase", { productId }, { withCredentials: true });
    fetchCart(); 
  };

  const decrease = async (productId) => {
    await axios.put("https://ecommercebe-b90j.onrender.com/api/cart/decrease", { productId }, { withCredentials: true });
    fetchCart();
  };

  const removeItem = async (productId) => {
    await axios.delete(`https://ecommercebe-b90j.onrender.com/api/cart/remove/${productId}`, { withCredentials: true });
    fetchCart();
  };

  const total = cart.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div key={item._id} className="cart-card">
        <div className="flex justify-between items-center border p-4 mb-3 rounded-lg">
          <div>
            <h2 className="font-semibold">{item.productId.name}</h2>
            <p>₹{item.productId.price}</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => decrease(item.productId._id)} className="px-2 bg-gray-300 rounded">-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increase(item.productId._id)} className="px-2 bg-gray-300 rounded">+</button>
          </div>

          <button onClick={() => removeItem(item.productId._id)} className="text-red-500">Remove</button>
        </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="mt-4 text-right">
          <h2 className="text-xl font-bold">Total: ₹{total}</h2>
          {/* <button
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
            onClick={() => window.location.href = "/checkout"}
          >
            Checkout
          </button> */}
          <button
  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
  onClick={() => navigate("/checkout")}
>
  Checkout
</button>
        </div>
      )}
    </div>
  );
}
