
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Beer, 
  Flame, 
  Heart, 
  Stethoscope, 
  GraduationCap, 
  UserPlus,
  Scissors,
  Laugh,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Camera,
  X,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ==============================================================================
// 🛠️ CONFIGURAÇÃO DO SUPABASE
// ==============================================================================

const supabaseUrl: string = 'https://rxylvuuysuczxfhfaxtf.supabase.co'; 
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eWx2dXV5c3VjenhmaGZheHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MTM0OTEsImV4cCI6MjA4MzM4OTQ5MX0.Fx06zLwLD2VsyDdphKxhUsNWTv2K4x018e8nALgVZaQ';

let supabase: SupabaseClient | null = null;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
  console.error("Erro ao iniciar Supabase:", e);
}

// ==============================================================================
// 📸 CONFIGURAÇÃO DE IMAGENS COM FALLBACK
// ==============================================================================

const PHOTOS = [
  { filename: 'foto1.jpeg', rotate: '-rotate-2' },
  { filename: 'foto2.jpeg', rotate: 'rotate-3' },
  { filename: 'foto3.jpeg', rotate: '-rotate-1' },
  { filename: 'foto4.jpeg', rotate: 'rotate-2' },
  { filename: 'foto5.jpeg', rotate: '-rotate-3' },
  { filename: 'foto6.jpeg', rotate: 'rotate-1' },
  { filename: 'foto7.jpeg', rotate: '-rotate-2' },
  { filename: 'foto8.jpeg', rotate: 'rotate-3' },
];

const SmartImage = ({ filename, alt, className }: { filename: string, alt: string, className?: string }) => {
  const githubBase = "https://raw.githubusercontent.com/mariodocouto/bdayxandinho/main/";
  const sources = [
    filename,               
    `/${filename}`,         
    `${githubBase}${filename}` 
  ];
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (currentIdx < sources.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-zinc-400 p-4 text-center">
        <AlertTriangle className="w-8 h-8 mb-2 opacity-20" />
        <span className="text-[10px] font-black uppercase tracking-tighter">Imagem não encontrada</span>
      </div>
    );
  }

  return (
    <img 
      src={sources[currentIdx]} 
      alt={alt} 
      className={className}
      onError={handleError}
      loading="eager"
    />
  );
};

// ==============================================================================
// 🎁 LISTA DE PRESENTES (Ordenada por valor: do menor para o maior)
// ==============================================================================

const GIFTS = [
  { id: 5, price: "R$ 30", title: "Minoxidil", description: "Porque a calvície não é mais uma ameaça, é uma realidade.", icon: <Scissors className="w-6 h-6 text-orange-400" /> },
  { id: 2, price: "R$ 50", title: "Kit Ressaca", description: "Engov e Epocler para o dia seguinte do churrasco.", icon: <Stethoscope className="w-6 h-6 text-blue-500" /> },
  { id: 6, price: "R$ 75", title: "Terapia", description: "Para entender por que ele ainda acha que tem 18 anos.", icon: <Laugh className="w-6 h-6 text-indigo-400" /> },
  { id: 4, price: "R$ 100", title: "Vaquinha Upgrade", description: "Contribuição para cirurgia de aumento peniano.", icon: <UserPlus className="w-6 h-6 text-green-500" /> },
  { id: 3, price: "R$ 200", title: "Curso de Adulto", description: "Curso de “como ser adulto” que eu nunca vou assistir.", icon: <GraduationCap className="w-6 h-6 text-purple-500" /> },
  { id: 1, price: "R$ 1.000", title: "Aliança pra Kamila", description: "Pra ver se ele toma vergonha na cara e oficializa logo.", icon: <Heart className="w-6 h-6 text-pink-500" /> }
];

export default function App() {
  const [nome, setNome] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGift, setSelectedGift] = useState<typeof GIFTS[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const pixKey = "006.114.420-78"; 

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!rsvpStatus) { setError("Escolhe uma opção aí, abençoado!"); return; }
    if (!supabase) { setError("Erro de conexão no banco."); return; }

    setIsSubmitting(true);
    try {
      const { error: supabaseError } = await supabase
        .from('confirmacoes')
        .insert([{ nome: nome.trim(), status: rsvpStatus }])
        .select();
      if (supabaseError) throw new Error(supabaseError.message);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Houve um problema.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Modal PIX */}
      {selectedGift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
          <div className="bg-white text-black w-full max-w-md rounded-[40px] p-8 relative shadow-2xl animate-in zoom-in duration-300">
            <button onClick={() => setSelectedGift(null)} className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-zinc-400" />
            </button>
            <div className="text-center">
              <div className="inline-flex p-4 bg-yellow-100 rounded-3xl mb-6">{selectedGift.icon}</div>
              <h3 className="text-3xl font-bungee mb-2 uppercase italic leading-none">{selectedGift.title}</h3>
              <p className="text-zinc-500 font-bold mb-8 uppercase text-xs tracking-widest">{selectedGift.price}</p>
              <div className="bg-zinc-100 p-6 rounded-3xl mb-6">
                <p className="text-[10px] font-black uppercase text-zinc-400 mb-2 tracking-widest">Chave PIX (CPF):</p>
                <div className="flex items-center justify-between bg-white border-2 border-zinc-200 p-4 rounded-2xl">
                  <span className="font-bold truncate mr-2">{pixKey}</span>
                  <button onClick={handleCopyPix} className="p-2 bg-black text-white rounded-xl hover:bg-zinc-800 transition-all flex-shrink-0">
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <p className="text-zinc-400 text-sm font-medium italic">"Obrigado por patrocinar minha sobrevivência!"</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-black to-black opacity-50"></div>
        <div className="z-10 max-w-4xl">
          <span className="inline-block px-4 py-1 rounded-full bg-zinc-900 text-yellow-400 font-bold text-sm mb-6 uppercase tracking-[0.2em] border border-zinc-800">Bagé / RS • 2026</span>
          <h1 className="text-6xl md:text-9xl font-bungee leading-none mb-8 tracking-tighter uppercase italic">XANDINHO <span className="text-yellow-400 block md:inline">32</span></h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-medium tracking-tight">Churrasco, cerveja gelada e as melhores decisões erradas.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#rsvp" className="px-12 py-6 bg-yellow-400 text-black text-2xl font-bungee rounded-2xl hover:bg-white transition-all shadow-[8px_8px_0px_0px_white] active:translate-y-1 active:shadow-none uppercase tracking-tighter">CONFIRMAR</a>
            <a href="#presentes" className="px-12 py-6 border-2 border-white text-white text-2xl font-bungee rounded-2xl hover:bg-zinc-900 transition-all uppercase tracking-tighter">PRESENTES</a>
          </div>
        </div>
      </section>

      {/* Main Info */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Calendar className="w-12 h-12 text-yellow-400" />, title: "10 JAN", subtitle: "SÁBADO • 12:00" },
          { icon: <MapPin className="w-12 h-12 text-green-500" />, title: "BAGÉ / RS", subtitle: "R. BARÃO DO TRIUNFO, 1428 (Casa Verde)" },
          { icon: <Beer className="w-12 h-12 text-orange-500" />, title: "CHURRASCO E CERVEJA", subtitle: "COMO GOSTAMOS" }
        ].map((item, idx) => (
          <div key={idx} className="bg-zinc-900/40 p-10 rounded-[32px] border border-zinc-800 text-center backdrop-blur-md hover:border-zinc-600 transition-colors">
            <div className="flex justify-center mb-6">{item.icon}</div>
            <h3 className="text-3xl font-bungee mb-2 uppercase tracking-tight">{item.title}</h3>
            <p className="text-zinc-500 font-black uppercase text-sm tracking-widest">{item.subtitle}</p>
          </div>
        ))}
      </section>

      {/* Photo Gallery - POLAROID STYLE */}
      <section id="fotos" className="py-32 bg-zinc-950 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <div className="inline-block p-3 bg-zinc-900 rounded-2xl mb-6">
              <Camera className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-5xl md:text-8xl font-bungee mb-4 uppercase leading-none italic">MEMÓRIAS</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {PHOTOS.map((photo, index) => (
              <div 
                key={index} 
                className={`relative group bg-white p-4 pb-8 shadow-2xl transition-all duration-500 hover:z-20 hover:scale-105 hover:rotate-0 ${photo.rotate} w-full max-w-[280px]`}
              >
                <div className="w-full aspect-square overflow-hidden bg-zinc-100 flex items-center justify-center">
                  <SmartImage 
                    filename={photo.filename} 
                    alt={`Foto de aniversário ${index + 1}`} 
                    className="w-full h-full object-cover block"
                  />
                </div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-zinc-200/60 backdrop-blur-sm -rotate-3 z-30 shadow-sm border border-white/20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift List */}
      <section id="presentes" className="py-24 bg-black px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-8xl font-bungee mb-4 uppercase leading-none italic">AJUDE O <span className="text-yellow-400">XANDINHO</span></h2>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-sm italic">Lista de sobrevivência (contribuições voluntárias)</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GIFTS.map(gift => (
              <div key={gift.id} className="bg-zinc-900 p-8 rounded-[40px] border border-zinc-800 flex flex-col justify-between group hover:border-yellow-400/50 transition-all duration-500 hover:translate-y-[-8px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-yellow-400 group-hover:text-black transition-all duration-500">{gift.icon}</div>
                    <span className="text-yellow-400 font-bungee text-xl italic">{gift.price}</span>
                  </div>
                  <h4 className="font-bold mb-3 uppercase text-xl tracking-tight leading-none italic">{gift.title}</h4>
                  <p className="text-zinc-500 text-sm mb-8 leading-relaxed font-medium">{gift.description}</p>
                </div>
                <button onClick={() => setSelectedGift(gift)} className="w-full py-4 bg-zinc-800 hover:bg-white hover:text-black rounded-2xl font-black transition-all uppercase tracking-tighter text-sm italic">
                  Contribuir via PIX
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Form */}
      <section id="rsvp" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-2xl mx-auto bg-white text-black p-10 md:p-16 rounded-[60px] shadow-[16px_16px_0px_0px_#eab308]">
          <h2 className="text-5xl md:text-7xl font-bungee text-center mb-4 uppercase leading-none italic">CONFIRME SUA PRESENÇA</h2>
          <p className="text-center text-zinc-400 font-bold uppercase mb-12 tracking-widest text-sm italic">Responde logo pra não faltar cerveja</p>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase mb-3 ml-2 text-zinc-400 tracking-widest">Nome ou apelido carinhoso:</label>
                <input required type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Xandinho da Galera" className="w-full bg-zinc-100 border-2 border-zinc-100 p-6 rounded-[24px] focus:border-yellow-400 focus:bg-white outline-none font-bold text-xl transition-all" />
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase mb-1 ml-2 text-zinc-400 tracking-widest">Status da missão:</p>
                {['Tô dentro!', 'Não vai dar pra mim.', 'Talvez, sou indeciso.'].map(status => (
                  <label key={status} className={`flex items-center p-6 border-2 rounded-[24px] cursor-pointer transition-all duration-300 ${rsvpStatus === status ? 'border-yellow-500 bg-yellow-50 shadow-inner' : 'border-zinc-100 hover:border-zinc-200 bg-zinc-50'}`}>
                    <input type="radio" name="rsvp" value={status} onChange={(e) => setRsvpStatus(e.target.value)} className="hidden" />
                    <div className={`w-7 h-7 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${rsvpStatus === status ? 'border-yellow-500 bg-yellow-500' : 'border-zinc-300 bg-white'}`}>
                      {rsvpStatus === status && <div className="w-3 h-3 bg-white rounded-full"></div>}
                    </div>
                    <span className={`font-bold text-lg ${rsvpStatus === status ? 'text-yellow-700' : 'text-zinc-600'}`}>{status}</span>
                  </label>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-6 rounded-[24px] font-bold border-2 border-red-100 flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span className="text-sm leading-tight italic">{error}</span>
                </div>
              )}

              <button disabled={isSubmitting} type="submit" className="w-full py-8 bg-black text-white font-bungee text-3xl rounded-[24px] flex items-center justify-center gap-4 transition-all shadow-[0px_10px_0px_0px_#333] hover:translate-y-1 hover:shadow-none active:scale-95 disabled:opacity-50 uppercase italic tracking-tighter">
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'CONFIRMAR AGORA'}
              </button>
            </form>
          ) : (
            <div className="text-center py-16">
              <CheckCircle2 className="w-32 h-32 text-green-500 mx-auto mb-10 animate-bounce" />
              <h3 className="text-6xl font-bungee text-green-600 mb-6 uppercase italic leading-none">RESERVADO!</h3>
              <p className="text-2xl font-bold text-zinc-700">Prepara o fígado, nos vemos lá!</p>
              <button onClick={() => setSubmitted(false)} className="mt-12 text-zinc-400 hover:text-black underline font-black transition-colors uppercase text-[10px] tracking-[0.2em]">Mudar minha resposta</button>
            </div>
          )}
        </div>
      </section>

      <footer className="py-20 text-center text-zinc-800 font-bungee border-t border-zinc-900 tracking-[0.5em] uppercase text-[10px]">
        XANDINHO 32 • BAGÉ/RS • NO LIMITS SINCE '94
      </footer>
    </div>
  );
}
