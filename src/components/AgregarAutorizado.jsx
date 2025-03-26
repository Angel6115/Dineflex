import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Plus, Trash2, Pencil } from "lucide-react";
import FormularioAutorizado from "@/components/formularios/FormularioAutorizado";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner"; // ✅ ESTA ES LA LÍNEA QUE NECESITABAS

const AgregarAutorizado = ({ userId }) => {
  const [autorizados, setAutorizados] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const obtenerAutorizados = async () => {
    const { data, error } = await supabase
      .from("autorizados")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error al cargar personas");
      console.error("Error al obtener datos:", error);
    } else {
      setAutorizados(data);
    }
  };

  useEffect(() => {
    if (userId) {
      obtenerAutorizados();
    }
  }, [userId]);

  const guardarAutorizado = async (persona) => {
    if (persona.id) {
      // Editar
      const { error } = await supabase
        .from("autorizados")
        .update({
          nombre: persona.nombre,
          relacion: persona.relacion,
          telefono: persona.telefono,
          email: persona.email,
          ver_historial: persona.ver_historial,
          hacer_pedidos: persona.hacer_pedidos,
          ver_menu: persona.ver_menu,
        })
        .eq("id", persona.id)
        .eq("user_id", userId);

      if (error) {
        toast.error("Error al editar persona");
        return;
      }

      toast.success("Persona actualizada correctamente");
    } else {
      // Agregar
      const { error } = await supabase.from("autorizados").insert([
        {
          nombre: persona.nombre,
          relacion: persona.relacion,
          telefono: persona.telefono,
          email: persona.email,
          ver_historial: persona.ver_historial,
          hacer_pedidos: persona.hacer_pedidos,
          ver_menu: persona.ver_menu,
          user_id: userId,
        },
      ]);

      if (error) {
        toast.error("Error al agregar persona");
        return;
      }

      toast.success("Persona agregada correctamente");
    }

    setModalAbierto(false);
    obtenerAutorizados();
  };

  const eliminarAutorizado = async (id) => {
    const confirmar = confirm("¿Deseas eliminar esta persona autorizada?");
    if (!confirmar) return;

    const { error } = await supabase
      .from("autorizados")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      toast.error("Error al eliminar persona");
    } else {
      toast.success("Persona eliminada correctamente");
      obtenerAutorizados();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Personas Autorizadas</h2>
        <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
          <DialogTrigger asChild>
            <Button onClick={() => setSeleccionado(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{seleccionado ? "Editar" : "Agregar"} Persona</DialogTitle>
            <FormularioAutorizado
              datosIniciales={seleccionado}
              onGuardar={guardarAutorizado}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {autorizados.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{a.nombre}</p>
                <p className="text-sm text-muted-foreground">{a.relacion}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setSeleccionado(a);
                    setModalAbierto(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => eliminarAutorizado(a.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgregarAutorizado;
