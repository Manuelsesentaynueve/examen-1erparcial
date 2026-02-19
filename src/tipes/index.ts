export interface Gasto {
  idgasto?: number;
  categoria: string;
  monto: number;
  fecha: string;
}

export interface gastotipocontexto {
  gastos: Gasto[];
  presupuesto: number;
  categorias: string[];
  ponerPresupuesto: (monto: number) => void;
  agregarunnuevogasto: (gasto: Gasto) => Promise<void>;
  agregarunacategoria: (nuevacategoria: string) => void;
  cargarGastos: () => Promise<void>;
}