import React from "react";
import { motion } from "framer-motion";

export default function Cart({ cart, onPagar }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 rounded-xl bg-gray-50 border border-gray-200 shadow-sm space-y-4"
    >
      <h3 className="text-xl font-semibold text-gray-800">🛒 Tu Pedido</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {cart.map((item, i) => (
          <li key={i}>
            {item.name} – <span className="text-gray-500">${item.price}</span>
          </li>
        ))}
      </ul>

      <div className="text-right">
        <p className="mt-2 text-lg font-bold text-gray-900">Total: ${total}</p>
        <button
          onClick={onPagar}
          className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
        >
          Pagar después (BNPL)
        </button>
      </div>
    </motion.div>
  );
}
