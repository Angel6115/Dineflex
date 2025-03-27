// ✅ src/paginas/Inicio.jsx (con tabs visuales y con íconos solo para admin)

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Login from "@/auth/Login";
import Registro from "@/auth/Registro";
import MenuReserva from "@/components/MenuReserva";
import HistorialReservas from "@/components/HistorialReservas";
import ReservasAdmin from "@/components/admin/ReservasAdmin";
import Cargando from "@/components/ui/Cargando";
import { Button } from "@/components/ui/button";
import { Utensils, ClipboardList, UsersRound } from "lucide-react";

const Inicio = () => {
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState("cargando");
  const [tab, setTab] = useState("reservar");
  const [rol, setRol] = useState("cliente");

  useEffect(() => {
    const verificarSesion = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUsuario(data.session.user);
        setRol(data.session.user.user_metadata?.rol || "cliente");
        setVista("app");
      } else {
        setVista("login");
      }
    };

    verificarSesion();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUsuario(session.user);
        setRol(session.user.user_metadata?.rol || "cliente");
        setVista("app");
      } else {
        setUsuario(null);
        setVista("login");
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    setVista("login");
  };

  if (vista === "cargando") return <Cargando />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {vista === "login" && (
        <>
          <Login
            onLogin={(user) => {
              setUsuario(user);
              setRol(user.user_metadata?.rol || "cliente");
              setVista("app");
            }}
          />
          <p className="text-center mt-4 text-sm">
            ¿No tienes cuenta?{" "}
            <button onClick={() => setVista("registro")} className="text-blue-600 underline">
              Regístrate aquí
            </button>
          </p>
        </>
      )}

      {vista === "registro" && (
        <>
          <Registro />
          <p className="text-center mt-4 text-sm">
            ¿Ya tienes cuenta?{" "}
            <button onClick={() => setVista("login")} className="text-blue-600 underline">
              Inicia sesión
            </button>
          </p>
        </>
      )}

      {vista === "app" && usuario && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">Bienvenido(a)</p>
              <p className="text-blue-600">{usuario.email}</p>
              <p className="text-sm text-green-600">Rol: {rol}</p>
            </div>
            <Button variant="outline" onClick={cerrarSesion}>
              Cerrar sesión
            </Button>
          </div>

          {/* Tabs con íconos */}
          <div className="flex gap-2 border-b pb-2 overflow-x-auto">
            <Button
              variant={tab === "reservar" ? "default" : "ghost"}
              onClick={() => setTab("reservar")}
              className="flex items-center gap-2"
            >
              <Utensils className="w-4 h-4" /> Reservar
            </Button>
            <Button
              variant={tab === "historial" ? "default" : "ghost"}
              onClick={() => setTab("historial")}
              className="flex items-center gap-2"
            >
              <ClipboardList className="w-4 h-4" /> Mis reservas
            </Button>
            {rol === "admin" && (
              <Button
                variant={tab === "admin" ? "default" : "ghost"}
                onClick={() => setTab("admin")}
                className="flex items-center gap-2"
              >
                <UsersRound className="w-4 h-4" /> Reservas globales
              </Button>
            )}
          </div>

          {tab === "reservar" && <MenuReserva />}
          {tab === "historial" && <HistorialReservas />}
          {tab === "admin" && rol === "admin" && <ReservasAdmin />}
        </div>
      )}
    </div>
  );
};

export default Inicio;
