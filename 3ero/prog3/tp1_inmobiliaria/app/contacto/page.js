export default function Contacto() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-lg">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-3">Hablemos de tu inversión</h1>
          <p className="text-slate-500">
            Completa el formulario y uno de nuestros asesores se comunicará contigo a la brevedad.
          </p>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Nombre completo</label>
              <input 
                type="text" 
                placeholder="Ej. Juan Pérez" 
                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Correo electrónico</label>
              <input 
                type="email" 
                placeholder="tucorreo@email.com" 
                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Asunto o Inmueble de interés</label>
            <input 
              type="text" 
              placeholder="Ej. Información sobre Torre Central" 
              className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Mensaje</label>
            <textarea 
              placeholder="Escribe tu consulta aquí..." 
              className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl h-32 resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            ></textarea>
          </div>

          <button 
            type="button" 
            className="w-full bg-slate-800 text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
}