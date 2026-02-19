import "./globals.css";
import { GastoProvider } from "../context/gastocontext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <GastoProvider>
          {children}
        </GastoProvider>
      </body>
    </html>
  );
}