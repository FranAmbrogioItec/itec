import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Inmobiliaria Next',
  description: 'Gestión de edificios y propiedades',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-white text-gray-800">

        {/* Barra de Navegación */}
        <nav className="bg-slate-800 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">InmoNext</Link>
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:text-blue-300">Inicio</Link></li>
              <li><Link href="/propiedades" className="hover:text-blue-300">Propiedades</Link></li>
              <li><Link href="/nosotros" className="hover:text-blue-300">Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-blue-300">Contacto</Link></li>
            </ul>
          </div>
        </nav>

        {/* Contenido Principal */}
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>

        {/* Pie de página */}
        <footer className="bg-slate-900 text-white p-6 text-center mt-auto">
          <p>© 2026 Inmobiliaria Next. Todos los derechos reservados.</p>
        </footer>

      </body>
    </html>
  );
}