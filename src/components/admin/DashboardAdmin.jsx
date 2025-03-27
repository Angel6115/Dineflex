// ✅ src/components/admin/DashboardAdmin.jsx

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

const DashboardAdmin = () => {
  const [stats, setStats] = useState(null);

  const obtenerEstadisticas = async () => {
    const [{ count: totalUsuarios }, { count: totalAutorizados }, { data: conFoto }, { data: conDoc }, { data: ultimos }] = await Promise.all([
      supabase.auth.admin.listUsers().then((res) => ({ count: res.data.users.length })),
      supabase.from("autorizados").select("id", { count: "exact", head: true }),
      supabase.from("autorizados").select("id").not("foto_url", "is", null),
      supabase.from("autorizados").select("id").not("documento_url", "is", null),
      supabase.from("autorizados").select("nombre", { count: 1 }).order("created_at", { ascending: false }).limit(3),
    ]);

    setStats({
      totalUsuarios,
      totalAutorizados,
      conFoto: conFoto.length,
      conDoc: conDoc.length,
      ultimos,
    });
  };

  useEffect(() => {
    obtenerEstadisticas();
  }, []);

  if (!stats) {
    return <p className="flex items-center gap-2 text-muted-foreground"><Loader2 className="animate-spin w-4 h-4" /> Cargando estadísticas...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total de usuarios</p>
          <p className="text-2xl font-bold">{stats.totalUsuarios}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Personas autorizadas</p>
          <p className="text-2xl font-bold">{stats.totalAutorizados}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Con foto subida</p>
          <p className="text-2xl font-bold">{stats.conFoto}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Con documento subido</p>
          <p className="text-2xl font-bold">{stats.conDoc}</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-2">Últimos registrados</p>
          <ul className="list-disc list-inside text-sm">
            {stats.ultimos.map((item, idx) => (
              <li key={idx}>{item.nombre}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAdmin;
