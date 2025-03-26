import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Login from "@/auth/Login";
import Registro from "@/auth/Registro";
import AgregarAutorizado from "@/components/perfil/AgregarAutorizado";
import { Button } from "@/components/ui/button";

const Inicio = () => {
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState("login"); // login | registro | app

  useEffect(() => {
    const verificarSesion = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUsuario(data.session.user);
        setVista("app");
      }
    };

    verificarSesion();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUsuario(session.user);
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {vista === "login" && (
        <>
          <Login
            onLogin={(user) => {
              setUsuario(user);
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
          {/* PERFIL DEL USUARIO */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">Sesión iniciada como:</p>
              <p className="text-blue-600">{usuario.email}</p>
              <p className="text-sm text-muted-foreground">ID: {usuario.id}</p>
            </div>
            <Button variant="outline" onClick={cerrarSesion}>
              Cerrar sesión
            </Button>
          </div>

          {/* COMPONENTE PRINCIPAL */}
          <AgregarAutorizado userId={usuario.id} />
        </div>
      )}
    </div>
  );
};

export default Inicio;
