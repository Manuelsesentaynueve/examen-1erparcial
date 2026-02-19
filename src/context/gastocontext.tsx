'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Gasto, gastotipocontexto } from '../tipes/index';

const GastoContextt = createContext<gastotipocontexto | undefined>(undefined);

export const Provaidergasto = ({ children }: { children: React.ReactNode }) => {
  const [gastos,ponergastos] =useState  <Gasto[]>([]);
  const [presupuesto,ponerPresupuesto] = useState <number>(0);
  const [categorias,setlascategorias] = useState <string[]>(['Alimentaciones','Busitos','Indumentaria']);

  const API_URL = 'http://localhost:5000/gasto';

  const cargarlosgastos = async () => {
    try {
      const response = await axios.get(API_URL);
      ponergastos(response.data);
    } catch (error) {
      console.error("n pudimos obtener el gatso:", error);
    }
  };

  const agregarunnuevogasto = async (unnuevogasto: Gasto) => {
    try {
      await axios.post(API_URL, unnuevogasto);
      await cargarlosgastos();
    } catch (error) {
      console.error("hay un error para obteber el gasto", error);
      alert("gasto no guardado en el servidor crack");
    }
  };


  const agregarunacategoria = (nuevacategoria: string) => {
    if (!categorias.find(c => c.toLowerCase() === nuevacategoria.toLowerCase())) {
      setlascategorias([...categorias, nuevacategoria]);
    }
  };

  useEffect(() => {
    cargarlosgastos();
  }, []);

  return (
    <GastoContextt.Provider value={{ 
      gastos, 
      presupuesto, 
      categorias, 
      ponerPresupuesto, 
      agregarunnuevogasto, 
      agregarunacategoria,
      cargarGastos: cargarlosgastos 
    }}>
      {children}
    </GastoContextt.Provider>
  );
};

export const usargastos = () => {
  const context = useContext(GastoContextt);
  if (!context) {
    throw new Error('usear gastos debe y tiene que ser usado dentro de un Gasto del Provider');
  }
  return context;
};