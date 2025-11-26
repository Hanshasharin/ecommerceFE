import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/product" className="text-2xl font-bold text-indigo-600">
          🛍️ ShopZone
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/product" className="text-gray-700 font-medium hover:text-indigo-600">
            Home
          </Link>
          <Link to="/orders" className="text-gray-700 font-medium hover:text-indigo-600">
            My Orders
          </Link>
          <Link
            to="/cart"
            className="relative bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            🛒 Go to Cart
          </Link>
        </nav>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-white shadow-inner animate-slideDown">
          <Link
            to="/product"
            className="block text-gray-700 font-medium hover:text-indigo-600"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/orders"
            className="block text-gray-700 font-medium hover:text-indigo-600"
            onClick={() => setOpen(false)}
          >
            My Orders
          </Link>
          <Link
            to="/cart"
            className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow"
            onClick={() => setOpen(false)}
          >
            🛒 Go to Cart
          </Link>
        </div>
      )}
    </header>
  );
}
