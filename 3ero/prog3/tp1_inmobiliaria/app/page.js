import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 w-full rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
        {/* Elemento decorativo de fondo */}
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight relative z-10">
          Encuentra tu próximo <span className="text-blue-400">proyecto</span>
        </h1>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto relative z-10">
          Descubre los mejores desarrollos inmobiliarios y edificios en pozo con asesoramiento especializado.
        </p>

        <div className="flex gap-4 justify-center relative z-10">
          <Link
            href="/propiedades"
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Ver Catálogo
          </Link>
          <Link
            href="/contacto"
            className="bg-transparent border border-slate-400 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Asesoramiento
          </Link>
        </div>
      </div>
    </div>
  );
}