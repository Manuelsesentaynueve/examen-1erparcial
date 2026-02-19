'use client';
import { usargastos } from '../../context/gastocontext';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { 
    presupuesto, 
    ponerPresupuesto, 
    gastos, 
    cargarGastos, 
    agregarunnuevogasto, 
    categorias, 
    agregarunacategoria 
  } = usargastos();
  
  const [nuevoPresupuesto, setNuevoPresupuesto] = useState(0);

  useEffect(() => 
    {
    cargarGastos();
  }, []);

  const totaldelosgastos = gastos?.reduce((acc: number, item: any) => {
    return acc + (Number(item.monto) || 0);
  }, 0) || 0;

  const porcentajequeconsumiste = presupuesto > 0 ? (totaldelosgastos / presupuesto) * 100 : 0;
  const superaste80 = porcentajequeconsumiste >= 80 && porcentajequeconsumiste < 100;
  const superasteel100 = porcentajequeconsumiste >= 100;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Cuida tus finanzas pues</h1>
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
              onClick={() => ponerPresupuesto(nuevoPresupuesto)}
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
              <p className="text-2xl font-mono text-black">L. {totaldelosgastos.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4">
            {superaste80 && !superasteel100 && (
              <div className="p-4 bg-yellow-400 text-yellow-900 font-bold rounded-lg animate-pulse">
                Chivas ya alcanzaste el 80% de tu presupuesto, tene cuidado 
              </div>
            )}
            {superasteel100 && (
              <div className="p-4 bg-red-600 text-white font-bold rounded-lg shadow-lg">
                acabas de superar el limite del presupuesto tenes que ajustar tus gastos!!!
              </div>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Registrar un nuevo gasto</h2>
          <form 
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const nuevo = {
                categoria: formData.get('categoria') as string,
                monto: Number(formData.get('monto')),
                fecha: formData.get('fecha') as string,
              };
              await agregarunnuevogasto(nuevo);
              form.reset();
            }}
          >
            <select name="categoria" className="border p-2 rounded text-black bg-white" required>
              {categorias.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
            <input name="monto" type="number" placeholder="Monto L." className="border p-2 rounded text-black" required />
            <input name="fecha" type="date" className="border p-2 rounded text-black" required />
            <button type="submit" className="bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700">
              Añadir
            </button>
          </form>
          <div className="mt-4 flex gap-2 border-t pt-4">
            <input id="newCat" type="text" placeholder="Nueva categoría..." className="border p-2 rounded text-sm text-black flex-1" />
            <button 
              onClick={() => {
                const el = document.getElementById('newCat') as HTMLInputElement;
                if(el.value) { agregarunacategoria(el.value); el.value = ''; }
              }}
              className="bg-gray-200 px-4 py-2 rounded text-sm text-black font-bold hover:bg-gray-300"
            >
              + Categoría
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Historial de Gastos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3 border">Fecha</th>
                  <th className="p-3 border">Categoría</th>
                  <th className="p-3 border text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {gastos.map((g, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-3 border">{g.fecha}</td>
                    <td className="p-3 border capitalize">{g.categoria}</td>
                    <td className="p-3 border text-right font-bold text-black">L. {Number(g.monto).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}