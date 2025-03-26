import React from "react";
import useUser from "../hooks/useUser";

export default function Perfil() {
  const { user } = useUser();

  if (!user) return <p className="text-center text-gray-500">Cargando perfil...</p>;

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 space-y-6 border border-gray-200">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-indigo-600">👤 Perfil DineFlex</h2>
        <p className="text-gray-600">Disfruta tus beneficios exclusivos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Información Personal</h3>
          <p><strong>Nombre:</strong> {user.nombre || "No especificado"}</p>
          <p><strong>Correo:</strong> {user.email || "No registrado"}</p>
          <p><strong>Puntos acumulados:</strong> ⭐ {user.puntos ?? 0}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">💳 Crédito Disponible</h3>
          <p><strong>Puntuación:</strong> 680 (Soft pull)</p>
          <p><strong>Aprobado:</strong> $1,800 mensual</p>
        </div>
      </div>

      {user.historial?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-indigo-700">📋 Historial de Pedidos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {user.historial.map((pedido, i) => (
              <div key={i} className="bg-white border rounded-lg p-3 shadow-sm">
                <p><strong>Total:</strong> ${pedido.total}</p>
                <p><strong>Tipo:</strong> {pedido.tipoPago}</p>
                <p><strong>Cuotas:</strong> {pedido.cuotas}</p>
                <p className="text-sm text-gray-500">{new Date(pedido.fecha).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {user.autorizados?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-indigo-700">👥 Personas Autorizadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {user.autorizados.map((persona, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded-lg shadow-sm border">
                <p><strong>Nombre:</strong> {persona.nombre}</p>
                <p><strong>Teléfono:</strong> {persona.telefono}</p>
                <p><strong>Límite autorizado:</strong> ${persona.limite}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
