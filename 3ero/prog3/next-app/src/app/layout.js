import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
          <ul style={{ display: 'flex', gap: '15px', listStyle: 'none' }}>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/about">Nosotros</Link></li>
            <li><Link href="/notes/create">Nueva Nota</Link></li>
            <li><Link href="/notes/1">Nota Ejemplo (Dinámica)</Link></li>
          </ul>
        </nav>

        <main style={{ minHeight: '80vh', padding: '20px' }}>
          {children}
        </main>

        <footer style={{ padding: '20px', borderTop: '1px solid #ccc', marginTop: '20px' }}>
          <p>Desarrollado por Francisco - Estudiante de Desarrollo de Software</p>
          <p>Proyecto: Sistema de Notas con Next.js</p>
        </footer>
      </body>
    </html>
  );
}