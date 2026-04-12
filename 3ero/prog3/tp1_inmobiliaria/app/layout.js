import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Inmobiliaria Next',
  description: 'Gestión de edificios y propiedades de primer nivel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
        
        {/* Barra de Navegación Mejorada */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-2xl font-extrabold tracking-tighter text-blue-600 group-hover:scale-105 transition-transform">
                Inmo<span className="text-slate-800">Next</span>
              </span>
            </Link>

            {/* Enlaces de navegación con efectos hover */}
            <ul className="hidden md:flex items-center space-x-2">
              <li>
                <Link 
                  href="/" 
                  className="px-4 py-2 rounded-full text-slate-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href="/propiedades" 
                  className="px-4 py-2 rounded-full text-slate-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                >
                  Propiedades
                </Link>
              </li>
              <li>
                <Link 
                  href="/nosotros" 
                  className="px-4 py-2 rounded-full text-slate-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                >
                  Nosotros
                </Link>
              </li>
              {/* Botón de contacto destacado */}
              <li className="pl-2">
                <Link 
                  href="/contacto" 
                  className="bg-slate-800 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Contenido Principal */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Pie de página mejorado */}
        <footer className="bg-slate-900 text-slate-400 py-10 mt-auto border-t border-slate-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tighter">
              Inmo<span className="text-blue-500">Next</span>
            </h2>
            <p className="mb-6 max-w-md mx-auto text-sm">
              Conectando inversores y familias con los mejores desarrollos inmobiliarios y edificios de la región.
            </p>
            <div className="flex justify-center space-x-6 mb-8 text-sm">
              <Link href="/propiedades" className="hover:text-white transition-colors">Catálogo</Link>
              <Link href="/nosotros" className="hover:text-white transition-colors">Equipo</Link>
              <Link href="/contacto" className="hover:text-white transition-colors">Soporte</Link>
            </div>
            <p className="text-xs border-t border-slate-800 pt-6">
              © {new Date().getFullYear()} Inmobiliaria Next. Trabajo Práctico Nº 1.
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}