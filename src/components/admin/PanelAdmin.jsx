import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PanelAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerUsuarios = async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/get-users");
      const data = await res.json();

      if (res.ok) {
        setUsuarios(data);
      } else {
        toast.error("Error al obtener usuarios: " + data.error);
      }
    } catch (error) {
      toast.error("Error de red al obtener usuarios");
    }
    setCargando(false);
  };

  const cambiarRol = async (user, nuevoRol) => {
    try {
      const res = await fetch("/api/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id, nuevoRol }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Rol actualizado a ${nuevoRol}`);
        obtenerUsuarios();
      } else {
        toast.error("Error al cambiar rol: " + data.error);
      }
    } catch (error) {
      toast.error("Error de red al cambiar rol");
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Usuarios Registrados</h2>
      {cargando ? (
        <p className="text-muted-foreground">Cargando usuarios...</p>
      ) : (
        usuarios.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{user.email}</p>
                <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                <p className="text-sm">Rol: {user.user_metadata?.rol || "sin rol"}</p>
              </div>
              <div className="flex gap-2">
                {user.user_metadata?.rol !== "admin" && (
                  <Button
                    size="sm"
                    onClick={() => cambiarRol(user, "admin")}
                  >
                    Hacer Admin
                  </Button>
                )}
                {user.user_metadata?.rol !== "cliente" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => cambiarRol(user, "cliente")}
                  >
                    Hacer Cliente
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PanelAdmin;
