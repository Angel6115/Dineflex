// ✅ src/components/MenuReserva.jsx (con registro de puntos por recomendación del chef)

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

const comida = [
  { id: 1, name: 'Bruschetta', price: 13 },
  { id: 2, name: 'Calamari', price: 17 },
  { id: 3, name: 'Ensalada Verde', price: 18 },
];

const bebidas = [
  { id: 4, name: 'Pinot Grigio', price: 11 },
  { id: 5, name: 'Cabernet Sauvignon', price: 14 },
  { id: 6, name: 'Rosé', price: 12 },
];

const propinas = [18, 20, 30];

const RECOMENDACION_CHEF = 'Bruschetta';

const MenuReserva = () => {
  const [seleccionados, setSeleccionados] = useState([]);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [propina, setPropina] = useState(18);

  const manejarSeleccion = (item) => {
    if (seleccionados.find((s) => s.id === item.id)) {
      setSeleccionados(seleccionados.filter((s) => s.id !== item.id));
    } else {
      setSeleccionados([...seleccionados, item]);
    }
  };

  const subtotal = seleccionados.reduce((acc, item) => acc + item.price, 0);
  const totalConPropina = subtotal + (subtotal * propina) / 100;
  const ganoPuntosChef = seleccionados.some((item) => item.name === RECOMENDACION_CHEF);

  const reservar = async () => {
    if (!fecha || !hora || seleccionados.length === 0) {
      toast.warning('Completa fecha, hora y selecciona al menos un ítem.');
      return;
    }

    const {
      data: { user },
      error: sessionError,
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error('No hay sesión activa.');
      return;
    }

    const { error } = await supabase.from('reservas').insert({
      user_id: user.id,
      fecha,
      hora,
      items: seleccionados,
      propina,
      total: totalConPropina,
    });

    if (error) {
      toast.error('Error al guardar la reserva.');
      console.error(error);
      return;
    }

    if (ganoPuntosChef) {
      await supabase.from('puntos').insert({
        user_id: user.id,
        tipo: 'chef_bonus',
        puntos: 10,
        motivo: 'Recomendación del chef'
      });
      toast.success('🎉 ¡Has ganado puntos extra por elegir la recomendación del chef!');
    } else {
      toast.success(`Reserva confirmada para el ${fecha} a las ${hora}. ¡Gracias!`);
    }

    setSeleccionados([]);
    setFecha('');
    setHora('');
    setPropina(18);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Reservar en Dine Cocina</h1>

      <div className="bg-yellow-100 text-yellow-800 p-3 rounded">
        🍽️ <strong>Recomendación del chef:</strong> {RECOMENDACION_CHEF} — gana puntos extra si lo eliges.
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">Selecciona tus platos</h2>
        <ul className="space-y-2">
          {comida.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-1">
              <span>
                {item.name}
                {item.name === RECOMENDACION_CHEF && ' 🌟'}
              </span>
              <div className="flex gap-2 items-center">
                <span>${item.price}</span>
                <Button variant="outline" size="sm" onClick={() => manejarSeleccion(item)}>
                  {seleccionados.find((s) => s.id === item.id) ? 'Quitar' : 'Agregar'}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Selecciona bebidas</h2>
        <ul className="space-y-2">
          {bebidas.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-1">
              <span>{item.name}</span>
              <div className="flex gap-2 items-center">
                <span>${item.price}</span>
                <Button variant="outline" size="sm" onClick={() => manejarSeleccion(item)}>
                  {seleccionados.find((s) => s.id === item.id) ? 'Quitar' : 'Agregar'}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Fecha y hora de la visita</h2>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <Label>Fecha</Label>
            <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <Label>Hora</Label>
            <Input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Propina</h2>
        <div className="flex gap-4">
          {propinas.map((p) => (
            <Button
              key={p}
              variant={propina === p ? 'default' : 'outline'}
              onClick={() => setPropina(p)}
            >
              {p}%
            </Button>
          ))}
        </div>
      </section>

      <div className="border-t pt-4">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p className="font-semibold text-lg">
          Total con propina: ${totalConPropina.toFixed(2)}
        </p>
      </div>

      <Button onClick={reservar} className="w-full text-lg py-2">
        Confirmar reserva con pedido
      </Button>
    </div>
  );
};

export default MenuReserva;
