// ✅ src/auth/Registro.jsx

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrarse = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          rol: "cliente", // 👈 asignamos el rol al registrarse
        },
      },
    });

    if (error) {
      toast.error("Error al registrarse");
    } else {
      toast.success("¡Registro exitoso! Revisa tu email.");
    }
  };

  return (
    <form
      onSubmit={registrarse}
      className="w-full max-w-sm mx-auto mt-20 space-y-6 bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold text-center">Registrarse</h2>

      <div>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="ejemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Contraseña</Label>
        <Input
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Crear cuenta
      </Button>
    </form>
  );
};

export default Registro;