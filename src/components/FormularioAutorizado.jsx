// ✅ src/components/formularios/FormularioAutorizado.jsx

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const FormularioAutorizado = ({ datosIniciales, onGuardar }) => {
  const [persona, setPersona] = useState({
    id: null,
    nombre: "",
    relacion: "",
    telefono: "",
    email: "",
    ver_historial: false,
    hacer_pedidos: false,
    ver_menu: false,
    foto_url: "",
    documento_url: "",
  });

  const [imagen, setImagen] = useState(null);
  const [documento, setDocumento] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    if (datosIniciales) {
      setPersona(datosIniciales);
    }
  }, [datosIniciales]);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setPersona({
      ...persona,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const subirArchivo = async (archivo, carpeta) => {
    if (!archivo) return null;
    setSubiendo(true);

    const nombreArchivo = `${carpeta}/${Date.now()}-${archivo.name}`;
    const { data, error } = await supabase.storage
      .from("autorizados")
      .upload(nombreArchivo, archivo);

    setSubiendo(false);

    if (error) {
      toast.error(`Error al subir ${carpeta}`);
      return null;
    }

    const url = supabase.storage.from("autorizados").getPublicUrl(nombreArchivo).data.publicUrl;
    return url;
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    let urlImagen = persona.foto_url;
    let urlDocumento = persona.documento_url;

    if (imagen) {
      const subida = await subirArchivo(imagen, "imagenes");
      if (subida) urlImagen = subida;
    }

    if (documento) {
      const subida = await subirArchivo(documento, "documentos");
      if (subida) urlDocumento = subida;
    }

    onGuardar({ ...persona, foto_url: urlImagen, documento_url: urlDocumento });
  };

  return (
    <form onSubmit={manejarSubmit} className="space-y-4">
      <div>
        <Label>Nombre</Label>
        <Input name="nombre" value={persona.nombre} onChange={manejarCambio} required />
      </div>

      <div>
        <Label>Relación</Label>
        <Input name="relacion" value={persona.relacion} onChange={manejarCambio} required />
      </div>

      <div>
        <Label>Teléfono</Label>
        <Input name="telefono" value={persona.telefono} onChange={manejarCambio} />
      </div>

      <div>
        <Label>Email</Label>
        <Input name="email" value={persona.email} onChange={manejarCambio} />
      </div>

      <div>
        <Label>Foto (opcional)</Label>
        <Input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
        {persona.foto_url && (
          <img
            src={persona.foto_url}
            alt="Foto actual"
            className="mt-2 h-24 rounded border"
          />
        )}
      </div>

      <div>
        <Label>Documento (opcional)</Label>
        <Input type="file" accept="application/pdf,.doc,.docx,.ppt,.pptx" onChange={(e) => setDocumento(e.target.files[0])} />
        {persona.documento_url && (
          <a href={persona.documento_url} target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-600 mt-1 underline">
            Ver documento actual
          </a>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="flex items-center gap-2">
          <Checkbox name="ver_historial" checked={persona.ver_historial} onCheckedChange={(v) => setPersona({ ...persona, ver_historial: v })} />
          Ver historial
        </label>
        <label className="flex items-center gap-2">
          <Checkbox name="hacer_pedidos" checked={persona.hacer_pedidos} onCheckedChange={(v) => setPersona({ ...persona, hacer_pedidos: v })} />
          Hacer pedidos
        </label>
        <label className="flex items-center gap-2">
          <Checkbox name="ver_menu" checked={persona.ver_menu} onCheckedChange={(v) => setPersona({ ...persona, ver_menu: v })} />
          Ver menú
        </label>
      </div>

      <Button type="submit" disabled={subiendo}>
        {subiendo ? "Subiendo archivos..." : "Guardar"}
      </Button>
    </form>
  );
};

export default FormularioAutorizado;
