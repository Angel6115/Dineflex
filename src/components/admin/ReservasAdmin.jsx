// ✅ src/components/admin/ReservasAdmin.jsx (con ingresos y platos más pedidos + recomendaciones del chef)

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, FileText, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const ReservasAdmin = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    setCargando(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Sesión no válida.');
      return;
    }

    const { data, error } = await supabase
      .from('reservas')
      .select('*, perfiles: user_id(email)')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error al cargar reservas');
      console.error(error);
    } else {
      setReservas(data);
    }

    setCargando(false);
  };

  const filtrarReservas = reservas.filter((r) => {
    if (desde && r.fecha < desde) return false;
    if (hasta && r.fecha > hasta) return false;
    return true;
  });

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Reservas Globales - Dine Cocina', 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [['Usuario', 'Fecha', 'Hora', 'Total', 'Items']],
      body: filtrarReservas.map((r) => [
        r.perfiles?.email || 'Desconocido',
        r.fecha,
        r.hora,
        `$${parseFloat(r.total).toFixed(2)}`,
        r.items.map((i) => i.name).join(', '),
      ]),
    });
    doc.save('reservas_dinecocina.pdf');
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filtrarReservas.map((r) => ({
        Usuario: r.perfiles?.email || 'Desconocido',
        Fecha: r.fecha,
        Hora: r.hora,
        Total: parseFloat(r.total).toFixed(2),
        Propina: r.propina,
        Items: r.items.map((i) => i.name).join(', '),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reservas');
    XLSX.writeFile(workbook, 'reservas_dinecocina.xlsx');
  };

  const dataPorFecha = Object.values(
    filtrarReservas.reduce((acc, reserva) => {
      if (!acc[reserva.fecha]) {
        acc[reserva.fecha] = { fecha: reserva.fecha, total: 0 };
      }
      acc[reserva.fecha].total += 1;
      return acc;
    }, {})
  ).sort((a, b) => a.fecha.localeCompare(b.fecha));

  const dataPorUsuario = Object.values(
    filtrarReservas.reduce((acc, reserva) => {
      const email = reserva.perfiles?.email || 'Desconocido';
      if (!acc[email]) {
        acc[email] = { email, total: 0 };
      }
      acc[email].total += 1;
      return acc;
    }, {})
  ).sort((a, b) => b.total - a.total);

  const dataIngresos = Object.values(
    filtrarReservas.reduce((acc, r) => {
      if (!acc[r.fecha]) {
        acc[r.fecha] = { fecha: r.fecha, total: 0 };
      }
      acc[r.fecha].total += parseFloat(r.total);
      return acc;
    }, {})
  ).sort((a, b) => a.fecha.localeCompare(b.fecha));

  const platosPopulares = Object.values(
    filtrarReservas.flatMap((r) => r.items).reduce((acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = { name: item.name, total: 0 };
      }
      acc[item.name].total += 1;
      return acc;
    }, {})
  ).sort((a, b) => b.total - a.total);

  const recomendacionChef = platosPopulares[0];

  if (cargando) {
    return (
      <p className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" /> Cargando reservas globales...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Todas las reservas</h2>
        <div className="flex flex-wrap gap-2">
          <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} className="border rounded px-2 py-1 text-sm" />
          <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} className="border rounded px-2 py-1 text-sm" />
          <Button onClick={exportarPDF} variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> PDF
          </Button>
          <Button onClick={exportarExcel} variant="outline" className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" /> Excel
          </Button>
        </div>
      </div>

      {recomendacionChef && (
        <div className="bg-yellow-100 text-yellow-900 p-4 rounded shadow">
          🍽️ <strong>Recomendación del chef:</strong> {recomendacionChef.name} — elegido {recomendacionChef.total} veces.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">📅 Reservas por fecha</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataPorFecha}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">💰 Ingresos por fecha</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataIngresos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">👤 Reservas por usuario</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataPorUsuario} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis allowDecimals={false} type="number" />
                <YAxis type="category" dataKey="email" width={150} />
                <Tooltip />
                <Bar dataKey="total" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">🍝 Platos más pedidos</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={platosPopulares} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis allowDecimals={false} type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip />
                <Bar dataKey="total" fill="#f97316" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {filtrarReservas.length === 0 ? (
        <p className="text-muted-foreground">No hay reservas registradas en este rango.</p>
      ) : (
        filtrarReservas.map((res) => (
          <Card key={res.id}>
            <CardContent className="p-4 space-y-1">
              <p className="text-sm text-gray-500">
                {res.fecha} a las {res.hora} –{' '}
                <span className="text-blue-600">{res.perfiles?.email || 'Usuario desconocido'}</span>
              </p>
              <ul className="list-disc ml-5 text-sm">
                {res.items.map((item, i) => (
                  <li key={i}>{item.name} - ${item.price}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm">Propina: {res.propina}%</p>
              <p className="font-semibold">Total: ${parseFloat(res.total).toFixed(2)}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ReservasAdmin;
