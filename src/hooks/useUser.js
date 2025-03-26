import { useState, useEffect } from "react";

const USER_KEY = "dineflexUser";

const crearUsuarioPorDefecto = () => ({
  nombre: "Cliente DineFlex",
  puntos: 0,
  historial: [],
  autorizados: [],
});

export default function useUser() {
  const [user, setUser] = useState(() => {
    const guardado = localStorage.getItem(USER_KEY);
    return guardado ? JSON.parse(guardado) : crearUsuarioPorDefecto();
  });

  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [user]);

  const agregarPedido = (pedido) => {
    setUser((prev) => ({
      ...prev,
      puntos: prev.puntos + Math.floor(pedido.total * 0.1), // 10% en puntos
      historial: [...(prev.historial || []), pedido],
    }));
  };

  const agregarAutorizado = (autorizado) => {
    setUser((prev) => ({
      ...prev,
      autorizados: [...(prev.autorizados || []), autorizado],
    }));
  };

  return { user, agregarPedido, agregarAutorizado };
}
