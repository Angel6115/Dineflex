import React from "react";

export default function ConfirmacionFinal({
  total,
  fee,
  initialPayment,
  finalTotal,
  selectedType,
  selectedDuration,
  card,
  onConfirm,
}) {
  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow border space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">✅ Confirmación Final</h2>

      <div className="text-gray-700 space-y-1">
        <p>💳 <strong>Método de pago:</strong> {card}</p>
        <p>📅 <strong>Plan seleccionado:</strong> {selectedType === "weekly" ? "Semanal" : `Mensual (${selectedDuration} meses)`}</p>
      </div>

      <div className="border-t pt-4 text-sm text-gray-600 space-y-1">
        <p>Subtotal: ${total.toFixed(2)}</p>
        <p>Fee DineFlex: ${fee.toFixed(2)}</p>
        <p className="text-indigo-700 font-semibold">Total con DineFlex: ${finalTotal.toFixed(2)}</p>
        <p className="text-green-600 font-bold">Pago inicial (20%): ${initialPayment.toFixed(2)}</p>
      </div>

      <div className="pt-4">
        <button
          onClick={onConfirm}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition"
        >
          Confirmar y Pagar
        </button>
      </div>
    </div>
  );
}
