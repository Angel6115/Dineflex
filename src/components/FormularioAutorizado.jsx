import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const FormularioAutorizado = ({ datosIniciales, onGuardar }) => {
  const [formulario, setFormulario] = useState({
    id: null,
    nombre: "",
    relacion: "",
    telefono: "",
    email: "",
    ver_historial: false,
    hacer_pedidos: false,
    ver_menu: false,
  });

  useEffect(() => {
    if (datosIniciales) {
      setFormulario(datosIniciales);
    }
  }, [datosIniciales]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarCheck = (nombre, valor) => {
    setFormulario((prev) => ({ ...prev, [nombre]: valor }));
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    onGuardar(formulario);
  };

  return (
    <form className="space-y-4 mt-4" onSubmit={enviarFormulario}>
      <div className="grid gap-2">
        <Label>Nombre completo</Label>
        <Input name="nombre" value={formulario.nombre} onChange={manejarCambio} required />
      </div>
      <div className="grid gap-2">
        <Label>Relación</Label>
        <Input name="relacion" value={formulario.relacion} onChange={manejarCambio} required />
      </div>
      <div className="grid gap-2">
        <Label>Teléfono</Label>
        <Input name="telefono" value={formulario.telefono} onChange={manejarCambio} />
      </div>
      <div className="grid gap-2">
        <Label>Email</Label>
        <Input name="email" type="email" value={formulario.email} onChange={manejarCambio} />
      </div>
      <div className="grid gap-2">
        <Label className="mb-1">Permisos</Label>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center gap-2">
            <Checkbox
              checked={formulario.ver_historial}
              onCheckedChange={(val) => manejarCheck("ver_historial", val)}
            />
            Puede ver historial
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={formulario.hacer_pedidos}
              onCheckedChange={(val) => manejarCheck("hacer_pedidos", val)}
            />
            Puede hacer pedidos
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={formulario.ver_menu}
              onCheckedChange={(val) => manejarCheck("ver_menu", val)}
            />
            Puede ver menú personalizado
          </label>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Guardar
      </Button>
    </form>
  );
};

export default FormularioAutorizado;
