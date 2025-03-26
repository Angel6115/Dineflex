import React, { useState } from "react";

export default function BNPLModal({ cart, onClose, onConfirmarPago }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const [tipoPago, setTipoPago] = useState("semanal");
  const [cuotas, setCuotas] = useState(4); // 4 semanas por defecto

  const feeRate = tipoPago === "semanal" ? 0.12 : 0.18;
  const fee = total * feeRate;
  const totalConFee = total + fee;
  const montoCuota = totalConFee / cuotas;

  const cuotasMensuales = [2, 3, 4];
  const cuotasSemanales = [4]; // fijo a 4 semanas

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">Detalles de Pago con DineFlex</h2>

        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Selecciona tipo de pago:</label>
          <select
            value={tipoPago}
            onChange={(e) => {
              setTipoPago(e.target.value);
              setCuotas(e.target.value === "semanal" ? 4 : 2); // reset cuotas
            }}
            className="w-full border rounded px-3 py-2"
          >
            <option value="semanal">Pago Semanal</option>
            <option value="mensual">Pago Mensual</option>
          </select>
        </div>

        {tipoPago === "mensual" && (
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Número de meses:</label>
            <select
              value={cuotas}
              onChange={(e) => setCuotas(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            >
              {cuotasMensuales.map((n) => (
                <option key={n} value={n}>
                  {n} meses
                </option>
              ))}
            </select>
          </div>
        )}

        {tipoPago === "semanal" && (
          <p className="mb-4 text-sm text-gray-500">Se divide automáticamente en 4 semanas.</p>
        )}

        <div className="border-t pt-4 space-y-2 text-gray-700 text-sm">
          <p>Total original: ${total.toFixed(2)}</p>
          <p>Fee por usar DineFlex: ${fee.toFixed(2)}</p>
          <p className="font-bold text-indigo-700">
            Total con DineFlex: ${totalConFee.toFixed(2)}
          </p>
          <p>
            Pagas en {cuotas} cuotas de{" "}
            <span className="font-semibold">${montoCuota.toFixed(2)}</span>
          </p>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={() =>
              onConfirmarPago({
                total: totalConFee.toFixed(2),
                cuotas,
                tipoPago,
              })
            }
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Confirmar y Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
