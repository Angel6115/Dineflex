import React from "react";

export default function DetallesPago({
  total,
  installment,
  planType,
  cuotas,
  fee,
  initialPayment,
}) {
  return (
    <div className="mt-6 border border-gray-200 rounded-lg p-5 bg-white shadow-sm space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        🧾 Detalles de Pago con DineFlex
      </h3>

      <div className="text-gray-700 space-y-2 text-sm">
        <p>
          <strong>Total del Pedido:</strong> ${total.toFixed(2)}
        </p>
        <p>
          <strong>Pago Inicial:</strong> ${initialPayment.toFixed(2)} –
          Se cargará a tu tarjeta al confirmar.
        </p>
        <p>
          <strong>Tarjeta:</strong> **** **** **** 1234 (Débito)
        </p>
        <p>
          <strong>Plan Seleccionado:</strong>{" "}
          {planType === "semanal"
            ? `${cuotas} semanas`
            : `${cuotas} mes${cuotas > 1 ? "es" : ""}`}
        </p>
        <p>
          <strong>Fee por uso de DineFlex:</strong> ${fee.toFixed(2)}
        </p>
        <p>
          <strong>Puntuación crediticia:</strong> 680
        </p>
        <p>
          <strong>Cantidad aprobada:</strong> $1,800 para gasto mensual
        </p>
        <hr className="my-2" />
        <p className="text-indigo-700 font-semibold">
          Pagas en {cuotas} {planType === "semanal" ? "pagos semanales" : "pagos mensuales"} de:{" "}
          ${installment}
        </p>
      </div>
    </div>
  );
}
