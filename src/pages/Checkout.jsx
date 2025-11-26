import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cart", {
        withCredentials: true,
      });
      setCart(res.data);
    } catch (err) {
      console.log("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.productId.price,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/orders/checkout",
        { paymentMethod, address },
        { withCredentials: true }
      );

      alert("Order placed successfully!");
      // Option 1: go to orders page
      navigate("/orders");
      // Option 2: go to a dedicated success page using res.data.order._id
      // navigate(`/order-success/${res.data.order._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order");
    }
  };

  if (!cart.length) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b last:border-b-0 py-2"
          >
            <div>
              <p className="font-medium">{item.productId.name}</p>
              <p className="text-sm text-gray-600">
                Qty: {item.quantity} × ₹{item.productId.price}
              </p>
            </div>
            <p className="font-semibold">
              ₹{item.quantity * item.productId.price}
            </p>
          </div>
        ))}

        <div className="flex justify-between mt-4 text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Delivery Address</h2>
        <textarea
          className="w-full border rounded p-2"
          placeholder="Enter your address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Payment Method</h2>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Cash on Delivery (COD)</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="ONLINE"
            checked={paymentMethod === "ONLINE"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Online Payment (Demo)</span>
        </label>

        <p className="text-xs text-gray-500 mt-2">
          Payment Gateway (Demo optional): here we **don’t** integrate real
          Razorpay/Stripe. If you choose ONLINE, we just mark it as PAID in DB.
        </p>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
}
