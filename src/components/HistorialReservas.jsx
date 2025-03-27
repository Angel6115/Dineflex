// ✅ src/components/HistorialReservas.jsx

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const HistorialReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarReservas = async () => {
      const {
        data: { user },
        error: sessionError,
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error('No hay sesión activa.');
        return;
      }

      const { data, error } = await supabase
        .from('reservas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Error al cargar reservas');
      } else {
        setReservas(data);
      }

      setCargando(false);
    };

    cargarReservas();
  }, []);

  if (cargando) {
    return (
      <p className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="animate-spin w-4 h-4" /> Cargando reservas...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Mis reservas</h2>
      {reservas.length === 0 ? (
        <p className="text-muted-foreground">Aún no has hecho ninguna reserva.</p>
      ) : (
        reservas.map((reserva) => (
          <Card key={reserva.id}>
            <CardContent className="p-4 space-y-1">
              <p className="text-sm text-gray-500">{reserva.fecha} a las {reserva.hora}</p>
              <ul className="text-sm list-disc ml-4">
                {reserva.items.map((item, i) => (
                  <li key={i}>{item.name} - ${item.price}</li>
                ))}
              </ul>
              <p className="font-semibold mt-2">Propina: {reserva.propina}%</p>
              <p className="font-semibold">Total pagado: ${parseFloat(reserva.total).toFixed(2)}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default HistorialReservas;
