'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const loginnuevo = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (usuario === 'admin' && password === 'admin123') {
      router.push('/dashboard');
    } else {
      setError('incorrecto, quien sos vos???');
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
         <h1 className="text-4xl font-black text-yellow-400 uppercase tracking-tighter italic">
           Mis Gastos
         </h1>
         <p className="text-slate-400 text-sm">estos estilos los hice con ia</p>
      </div>

      <div className="w-full max-w-sm bg-slate-800 p-1 border-t-4 border-yellow-500 shadow-2xl">
        <form className="bg-slate-800 p-6 space-y-5" onSubmit={loginnuevo}>
          
          <div>
            <label className="text-xs font-bold text-yellow-500 uppercase">User ID</label>
            <input
              type="text"
              required
              className="w-full bg-slate-700 border-b-2 border-slate-600 p-3 text-white focus:border-yellow-500 outline-none transition-all"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="admin"
            />
          </div>
          
          <div>
            <label className="text-xs font-bold text-yellow-500 uppercase">Password</label>
            <input
              type="password"
              required
              className="w-full bg-slate-700 border-b-2 border-slate-600 p-3 text-white focus:border-yellow-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****"
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border-l-4 border-red-500 p-2">
               <p className="text-xs text-red-200 font-bold">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black py-3 uppercase transition-transform active:scale-95"
          >
            Acceder al Sistema
          </button>
        </form>
      </div>

      <footer className="mt-10 text-slate-500 text-[10px] uppercase">
        holaaa
      </footer>
    </main>
  );
}