import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://ecommercebe-b90j.onrender.com/api/orders", {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders.length) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        <p>You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow p-4 border"
          >
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">
                Order ID: {order._id}
              </span>
              <span className="text-sm font-semibold">
                Status: {order.status}
              </span>
            </div>

            <div className="space-y-1 mb-3">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>
                    {item.productId?.name} × {item.quantity}
                  </span>
                  <span>₹{item.quantity * item.price}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold">
                Total: ₹{order.totalAmount}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
