import "./globals.css";
import { Provaidergasto } from "../context/gastocontext";

export default function RootLayout({ children }: { children: React.ReactNode })
 {
  return (
    <html lang="es">
      <body>
        <Provaidergasto>
          {children}
        </Provaidergasto>
      </body>
    </html>
  );
}