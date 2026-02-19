// Definimos exactamente lo que tiene la tabla de tu base de datos
export interface Gasto {
  idgasto?: number;
  categoria: string;
  monto: number;
  fecha: string;
}

// Definimos qué funciones y datos tendrá nuestro Contexto global
export interface GastoContextType {
  gastos: Gasto[];
  presupuesto: number;
  categorias: string[];
  setPresupuesto: (monto: number) => void;
  agregarGasto: (gasto: Gasto) => Promise<void>;
  agregarCategoria: (nuevaCat: string) => void;
  cargarGastos: () => Promise<void>;
}