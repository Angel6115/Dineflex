import React from "react";

export default function ResumenPago({
  total,
  initialPayment,
  fee,
  totalConFee,
  installment,
  tipoPago,
  cuotas,
  onConfirm,
}) {
  return (
    <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        🧾 Detalles de Pago con DineFlex
      </h3>

      <div className="text-gray-700 space-y-2">
        <p>
          <strong>Subtotal:</strong> ${total.toFixed(2)}
        </p>
        <p>
          <strong>Pago inicial (20%):</strong> ${initialPayment.toFixed(2)}
        </p>

        {/* Nueva sección visual para mostrar la tarjeta y aprobación */}
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 space-y-2">
          <p className="text-sm text-gray-700">
            <strong>💳 Tarjeta seleccionada para débito automático:</strong>
          </p>
          <p className="text-sm text-gray-900">**** **** **** 4242</p>

          <p className="text-sm text-gray-700 pt-2">
            <strong>📊 Puntuación crediticia estimada:</strong>{" "}
            <span className="text-indigo-700 font-bold">680</span>
          </p>
          <p className="text-sm text-gray-700">
            <strong>💰 Monto aprobado mensual:</strong>{" "}
            <span className="text-green-700 font-bold">$1,800</span>
          </p>
        </div>

        <p>
          <strong>Fee por usar DineFlex:</strong> ${fee.toFixed(2)}
        </p>
        <p>
          <strong>Total con Fee:</strong> ${totalConFee.toFixed(2)}
        </p>
        <p>
          <strong>Pagas en {cuotas} cuota(s) {tipoPago === "mensual" ? "mensuales" : "semanales"} de:</strong>{" "}
          ${installment.toFixed(2)}
        </p>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onConfirm}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition font-semibold"
        >
          Confirmar y pagar
        </button>
      </div>
    </div>
  );
}
