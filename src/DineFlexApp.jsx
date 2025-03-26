import { useState } from "react";
import Menu from "./components/Menu";
import Perfil from "./components/Perfil";
import Cart from "./components/Cart";
import BNPLModal from "./components/BNPLModal";
import PagoConfirmado from "./components/PagoConfirmado";
import useUser from "./hooks/useUser";

export default function DineFlexApp() {
  const [cart, setCart] = useState([]);
  const [mostrarBNPL, setMostrarBNPL] = useState(false);
  const [mostrarPagoConfirmado, setMostrarPagoConfirmado] = useState(false);
  const [mostrarPuntos, setMostrarPuntos] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { agregarPedido } = useUser();

  const handleConfirmarPago = (pedido) => {
    agregarPedido(pedido);
    setCart([]);
    setMostrarBNPL(false);
    setMostrarPagoConfirmado(true);
    setTimeout(() => {
      setMostrarPagoConfirmado(false);
      setMostrarPuntos(true);
      setTimeout(() => {
        setMostrarPuntos(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen p-6`}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">DineFlex 🍷</h1>
          <div className="space-x-2">
            <button
              onClick={() => setViewProfile(!viewProfile)}
              className="px-4 py-2 border rounded"
            >
              {viewProfile ? "Ver Menú" : "Ver Perfil"}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 border rounded"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* Vista dinámica */}
        {viewProfile ? (
          <Perfil />
        ) : (
          <>
            <Menu cart={cart} setCart={setCart} />
            <Cart cart={cart} onPagar={() => setMostrarBNPL(true)} />
          </>
        )}

        {/* Modal BNPL */}
        {mostrarBNPL && (
          <BNPLModal
            cart={cart}
            onClose={() => setMostrarBNPL(false)}
            onConfirmarPago={handleConfirmarPago}
          />
        )}

        {/* Confirmación y puntos */}
        {mostrarPagoConfirmado && <PagoConfirmado />}
        {mostrarPuntos && (
          <div className="text-center mt-4 text-green-600 font-semibold">
            🎉 Has acumulado puntos por tu compra.
          </div>
        )}
      </div>
    </div>
  );
}
