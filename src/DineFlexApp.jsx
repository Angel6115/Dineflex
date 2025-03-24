import { useState } from "react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Mole Madre",
    price: 110,
    image: "https://source.unsplash.com/400x300/?mole",
    description: "Mole histórico servido con tortillas artesanales.",
  },
  {
    id: 2,
    name: "Taco de Barbacoa",
    price: 60,
    image: "https://source.unsplash.com/400x300/?taco",
    description: "Barbacoa de cordero al horno de tierra.",
  },
];

const mockProfile = {
  name: "Alejandro Pérez",
  totalSpent: 595,
  level: "Platino",
  points: 180,
  bnplStatus: [
    { id: 1, item: "Mole Madre", status: "Pagado", due: "$0" },
    { id: 2, item: "Taco de Barbacoa", status: "Pendiente", due: "$15.00" },
  ],
};

export default function DineFlexApp() {
  const [cart, setCart] = useState([]);
  const [showBNPL, setShowBNPL] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setShowBNPL(false);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const installment = (total / 4).toFixed(2);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen p-6`}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">DineFlex 🍷</h1>
          <div className="space-x-2">
            <button onClick={() => setViewProfile(!viewProfile)} className="px-4 py-2 border rounded">
              {viewProfile ? "Ver Menú" : "Ver Perfil"}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 border rounded">
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {viewProfile ? (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Perfil VIP</h2>
            <p>Nombre: {mockProfile.name}</p>
            <p>Nivel: {mockProfile.level} ⭐</p>
            <p>Puntos: {mockProfile.points}</p>
            <h3 className="mt-4 font-semibold">Historial BNPL</h3>
            <ul>
              {mockProfile.bnplStatus.map((entry) => (
                <li key={entry.id}>{entry.item} - {entry.status} ({entry.due} restantes)</li>
              ))}
            </ul>
            <div className="mt-4 space-x-2">
              <button className="px-4 py-2 bg-purple-600 text-white rounded">Canjear puntos</button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded">Invitar amigo</button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold">Menú DineFlex</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded p-4 bg-white text-black">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="font-bold">${product.price}</span>
                    <button onClick={() => addToCart(product)} className="bg-black text-white px-3 py-1 rounded">
                      Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 mt-6 border rounded-xl bg-gray-100"
              >
                <h3 className="text-lg font-semibold">Tu pedido</h3>
                <ul className="list-disc list-inside">
                  {cart.map((item, i) => (
                    <li key={i}>{item.name} - ${item.price}</li>
                  ))}
                </ul>
                <p className="mt-2 font-bold">Total: ${total}</p>
                <button onClick={() => setShowBNPL(true)} className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">
                  Pagar después (BNPL)
                </button>
                {showBNPL && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center">
                    <p>Divide en 4 pagos semanales de:</p>
                    <p className="text-xl font-bold">${installment}</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}