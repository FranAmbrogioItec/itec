import Link from 'next/link';

export default function Nosotros() {
    return (
        <div className="mt-4">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Sobre Nuestra Inmobiliaria</h1>
            <p className="text-gray-600 mb-6 text-lg max-w-3xl">
                Somos especialistas en comercialización de edificios y desarrollos inmobiliarios.
                Nuestro objetivo es conectar a los inversores y familias con los mejores proyectos de la ciudad,
                asegurando transparencia y confianza en cada paso.
            </p>

            <div className="bg-slate-100 p-6 rounded-lg border inline-block">
                <h2 className="text-xl font-semibold mb-2">Conoce quiénes te asesoran</h2>
                <p className="text-gray-600 mb-4">Detrás de cada operación exitosa hay un gran grupo humano.</p>

                {/* Link hacia la ruta anidada */}
                <Link
                    href="/nosotros/equipo"
                    className="bg-slate-800 text-white px-5 py-2 rounded hover:bg-slate-700 transition"
                >
                    Ver nuestro equipo de ventas
                </Link>
            </div>
        </div>
    );
}