import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrarse = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Error al registrarse: " + error.message);
    } else {
      alert("¡Revisa tu email para confirmar el registro!");
    }
  };

  return (
    <form onSubmit={registrarse} className="space-y-4 max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-semibold text-center">Registro</h2>
      <div>
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label>Contraseña</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full">
        Registrarse
      </Button>
    </form>
  );
};

export default Registro;
