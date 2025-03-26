import React from "react";

const products = [
  {
    id: 1,
    name: "Mole Madre",
    price: 110,
    image: "/images/mole.jpg",
    description: "Mole histórico servido con tortillas artesanales.",
  },
  {
    id: 2,
    name: "Taco de Barbacoa",
    price: 60,
    image: "/images/taco.jpg",
    description: "Barbacoa de cordero al horno de tierra.",
  },
  {
    id: 3,
    name: "Ceviche de Camarón",
    price: 95,
    image: "/images/ceviche.jpg",
    description: "Fresco, cítrico y con un toque de chile serrano.",
  },
  {
    id: 4,
    name: "Filete Wagyu",
    price: 280,
    image: "/images/wagyu.jpg",
    description: "Carne premium cocinada al término perfecto.",
  },
];

export default function Menu({ cart, setCart }) {
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Menú DineFlex</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-gray-800">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transition"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
