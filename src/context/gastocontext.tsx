'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Gasto, GastoContextType } from '../tipes/index';

// Creamos el contexto
const GastoContext = createContext<GastoContextType | undefined>(undefined);

export const GastoProvider = ({ children }: { children: React.ReactNode }) => {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [presupuesto, setPresupuesto] = useState<number>(0);
  const [categorias, setCategorias] = useState<string[]>(['Comida', 'Transporte', 'Entretenimiento']);

  const API_URL = 'http://localhost:5000/gasto';

  // 1. Cargar gastos desde el backend (GET)
  const cargarGastos = async () => {
    try {
      const response = await axios.get(API_URL);
      // El backend devuelve el array de la tabla 'gasto'
      setGastos(response.data);
    } catch (error) {
      console.error("Error al obtener gastos:", error);
    }
  };

  // 2. Agregar un nuevo gasto (POST)
  const agregarGasto = async (nuevoGasto: Gasto) => {
    try {
      await axios.post(API_URL, nuevoGasto);
      await cargarGastos(); // Refrescar la lista automáticamente
    } catch (error) {
      console.error("Error al guardar el gasto:", error);
      alert("No se pudo guardar el gasto en el servidor.");
    }
  };

  // 3. Gestionar categorías personalizadas
  const agregarCategoria = (nuevaCat: string) => {
    if (!categorias.find(c => c.toLowerCase() === nuevaCat.toLowerCase())) {
      setCategorias([...categorias, nuevaCat]);
    }
  };

  // Cargamos los datos apenas se monte el proveedor
  useEffect(() => {
    cargarGastos();
  }, []);

  return (
    <GastoContext.Provider value={{ 
      gastos, 
      presupuesto, 
      categorias, 
      setPresupuesto, 
      agregarGasto, 
      agregarCategoria,
      cargarGastos 
    }}>
      {children}
    </GastoContext.Provider>
  );
};

// Hook para usar el contexto en los componentes
export const useGastos = () => {
  const context = useContext(GastoContext);
  if (!context) {
    throw new Error('useGastos debe ser usado dentro de un GastoProvider');
  }
  return context;
};