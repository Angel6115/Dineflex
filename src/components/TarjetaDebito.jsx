import React, { useState } from "react";

export default function TarjetaDebito({ tarjeta, setTarjeta }) {
  const [editando, setEditando] = useState(false);
  const [nuevaTarjeta, setNuevaTarjeta] = useState(tarjeta);

  const guardarCambios = () => {
    setTarjeta(nuevaTarjeta);
    setEditando(false);
  };

  return (
    <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
      <h4 className="text-md font-semibold text-gray-800 mb-2">Tarjeta de débito para débito automático</h4>

      {!editando ? (
        <>
          <p className="text-gray-700">💳 {tarjeta}</p>
          <button
            onClick={() => setEditando(true)}
            className="mt-2 text-indigo-600 hover:underline text-sm"
          >
            Cambiar tarjeta
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            className="border px-3 py-1 w-full mt-2 rounded text-sm"
            value={nuevaTarjeta}
            onChange={(e) => setNuevaTarjeta(e.target.value)}
          />
          <div className="mt-2 space-x-2">
            <button
              onClick={guardarCambios}
              className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditando(false)}
              className="text-gray-500 text-sm"
            >
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
