import React, { useState } from "react";

export default function VerificacionIdentidad({ onVerificar }) {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleEnviar = () => {
    if (!nombre.trim()) {
      setError("Por favor ingresa tu nombre completo.");
      return;
    }
    setError("");
    setEnviado(true);
  };

  const handleVerificar = () => {
    if (codigo === "123456") {
      onVerificar();
    } else {
      setError("Código incorrecto. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Verificación de identidad</h3>

      {!enviado ? (
        <>
          <p className="text-gray-600">Antes de continuar, verifica tu identidad.</p>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleEnviar}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Enviar código de verificación
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-600">
            Se envió un código de 6 dígitos al número registrado. Ingresa el código para continuar.
          </p>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código de verificación"
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleVerificar}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Verificar y continuar
          </button>
        </>
      )}
    </div>
  );
}
