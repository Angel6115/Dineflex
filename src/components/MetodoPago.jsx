import React, { useState } from "react";
import TarjetaDebito from "./TarjetaDebito";

export default function MetodoPago({ total, setMetodoSeleccionado, metodoSeleccionado, meses, setMeses }) {
  const [tarjeta, setTarjeta] = useState("**** **** **** 1234");

  const calcularFee = () => {
    if (metodoSeleccionado === "mensual") return total * 0.18;
    if (metodoSeleccionado === "semanal") return total * 0.12;
    return 0;
  };

  const fee = calcularFee();
  const totalConFee = total + fee;
  const pagoInicial = totalConFee * 0.2;
  const restante = totalConFee - pagoInicial;

  const cuotas = metodoSeleccionado === "mensual"
    ? meses
    : metodoSeleccionado === "semanal"
    ? 4
    : 1;

  const pagoPorCuota = (restante / cuotas).toFixed(2);

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow border space-y-4">
      <h3 className="text-xl font-bold text-gray-800">💳 Selecciona tipo de pago</h3>

      <div className="flex gap-4">
        <button
          onClick={() => setMetodoSeleccionado("semanal")}
          className={`px-4 py-2 rounded border ${
            metodoSeleccionado === "semanal"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          Semanal
        </button>
        <button
          onClick={() => setMetodoSeleccionado("mensual")}
          className={`px-4 py-2 rounded border ${
            metodoSeleccionado === "mensual"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          Mensual
        </button>
      </div>

      {metodoSeleccionado === "mensual" && (
        <div className="mt-2">
          <label className="text-sm font-medium text-gray-700 mr-2">Selecciona meses:</label>
          <select
            value={meses}
            onChange={(e) => setMeses(Number(e.target.value))}
            className="border px-3 py-1 rounded"
          >
            <option value={2}>2 meses</option>
            <option value={3}>3 meses</option>
            <option value={4}>4 meses</option>
          </select>
        </div>
      )}

      <div className="border-t pt-4 mt-4 space-y-2 text-gray-800">
        <p><strong>Subtotal:</strong> ${total.toFixed(2)}</p>
        <p><strong>Fee por usar DineFlex:</strong> ${fee.toFixed(2)}</p>
        <p><strong>Total con fee:</strong> ${totalConFee.toFixed(2)}</p>
        <p><strong>Pago inicial (20%):</strong> ${pagoInicial.toFixed(2)}</p>
        <p><strong>Resto a financiar:</strong> ${restante.toFixed(2)}</p>
        <p>
          <strong>Pagas en {cuotas} cuotas de:</strong>{" "}
          <span className="text-indigo-600 font-semibold">${pagoPorCuota}</span>
        </p>
      </div>

      {/* 💳 Tarjeta seleccionada para el débito automático */}
      <TarjetaDebito tarjeta={tarjeta} setTarjeta={setTarjeta} />

      <div className="mt-4 text-center text-sm text-gray-500">
        Con <strong>DineFlex</strong> sales mejor y disfrutas más 🍷
      </div>
    </div>
  );
}
