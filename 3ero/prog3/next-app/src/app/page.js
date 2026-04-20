import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenidos a mi Aplicación Next.js</h1>
      <p>Esta es la página de inicio personalizada para mi actividad de clase.</p>
      <div style={{ marginTop: '20px' }}>
        <Link href="/about" style={{ padding: '10px 20px', background: '#0070f3', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          Saber más
        </Link>
      </div>
    </div>
  );
}