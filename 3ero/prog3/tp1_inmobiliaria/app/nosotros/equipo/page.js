import Link from 'next/link';

export default function Equipo() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-4">Nuestro Equipo de Ventas</h1>
      <p className="mb-4">Contamos con los mejores asesores inmobiliarios de la región.</p>
      <Link href="/nosotros" className="text-blue-600 underline">
        Volver a Nosotros
      </Link>
    </div>
  );
}