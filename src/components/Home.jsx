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

export default function Home({ cart, addToCart, showBNPL, setShowBNPL }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const installment = (total / 4).toFixed(2);

  return (
    <>
      <h2 className="text-xl font-semibold">Menú DineFlex</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4 bg-white text-black">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="flex justify-between mt-2">
              <span className="font-bold">${product.price}</span>
              <button
                onClick={() => addToCart(product)}
                className="bg-black text-white px-3 py-1 rounded"
              >
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
              <li key={i}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: ${total}</p>
          <button
            onClick={() => setShowBNPL(true)}
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
          >
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
  );
}
