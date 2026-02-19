'use client';
import { useGastos } from '../../context/gastocontext';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { presupuesto, setPresupuesto, gastos, cargarGastos } = useGastos();
  const [nuevoPresupuesto, setNuevoPresupuesto] = useState(0);

  // Al cargar la página, traemos los gastos de la API
  useEffect(() => {
    cargarGastos();
  }, []);

  // Calculamos el total de gastos acumulados
 const totalGastos = gastos?.reduce((acc: number, item: any) => {
    return acc + (Number(item.monto) || 0);
  }, 0) || 0;
  // Lógica de Alertas
  const porcentajeConsumido = presupuesto > 0 ? (totalGastos / presupuesto) * 100 : 0;
  const supero80 = porcentajeConsumido >= 80 && porcentajeConsumido < 100;
  const supero100 = porcentajeConsumido >= 100;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Control Financiero</h1>

        {/* SECCIÓN DE PRESUPUESTO */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Presupuesto Mensual</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-1">Definir presupuesto inicial</label>
              <input 
                type="number" 
                className="w-full border p-2 rounded text-black"
                onChange={(e) => setNuevoPresupuesto(Number(e.target.value))}
                placeholder="Ej. 10000"
              />
            </div>
            <button 
              onClick={() => setPresupuesto(nuevoPresupuesto)}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Establecer
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-bold uppercase">Presupuesto Actual</p>
              <p className="text-2xl font-mono text-black">L. {presupuesto.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600 font-bold uppercase">Gastado a la fecha</p>
              <p className="text-2xl font-mono text-black">L. {totalGastos.toLocaleString()}</p>
            </div>
          </div>

          {/* ALERTAS DINÁMICAS (Requisito del examen) */}
          <div className="mt-4">
            {supero80 && !supero100 && (
              <div className="p-4 bg-yellow-400 text-yellow-900 font-bold rounded-lg animate-pulse">
                ⚠️ Cuidado: Has alcanzado el 80% de tu presupuesto.
              </div>
            )}
            
            {supero100 && (
              <div className="p-4 bg-red-600 text-white font-bold rounded-lg shadow-lg">
                🚨 Has superado el límite del presupuesto, debes ajustar gastos.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}