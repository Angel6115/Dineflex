import React from "react";

export default function ResumenConfirmado({ resumen, onVolver }) {
  if (!resumen) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
      <h2 className="text-2xl font-bold text-green-700 mb-4">✅ ¡Pago Confirmado!</h2>
      
      <p className="text-gray-700 mb-2">
        Has seleccionado el plan: <span className="font-medium">{resumen.tipoPago}</span>
      </p>

      <p className="text-gray-700 mb-2">
        Pago inicial: <span className="font-medium text-green-700">${resumen.pagoInicial}</span>
      </p>

      {resumen.tipoPago === "Mensual" ? (
        <p className="text-gray-700 mb-2">
          {resumen.plazo} mes(es) de:{" "}
          <span className="font-medium text-indigo-600">${resumen.pagoCuota}</span>
        </p>
      ) : (
        <p className="text-gray-700 mb-2">
          4 pagos semanales de:{" "}
          <span className="font-medium text-indigo-600">${resumen.pagoCuota}</span>
        </p>
      )}

      <p className="text-gray-700 mb-4">
        Tarjeta registrada:{" "}
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {resumen.tarjeta}
        </span>
      </p>

      <p className="text-gray-500 text-sm mb-6 italic">
        Aprobado con puntuación crediticia: <strong>{resumen.credito.puntaje}</strong> —{" "}
        Límite disponible: <strong>${resumen.credito.limite}</strong>
      </p>

      <button
        onClick={onVolver}
        className="mt-4 px-5 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
      >
        Volver al Menú
      </button>
    </div>
  );
}
