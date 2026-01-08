
import React, { useState } from 'react';
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
  AlertTriangle
} from 'lucide-react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ========================================================
// ✅ CONFIGURAÇÃO DO SUPABASE
// ========================================================
const supabaseUrl: string = 'https://rxylvuuysuczxfhfxfxtf.supabase.co'; 
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eWx2dXV5c3VjenhmYXh0ZiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzA0NjU2NjEwLCJleHAiOjIwMjAyMzI2MTB9.jH4ewX2dxV5c3VjenhmaGZHeHRMIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2NTY2MTAsImV4cCI6MjAyMDIzMjYxMH0';

let supabase: SupabaseClient | null = null;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
  console.error("Erro na inicialização:", e);
}

const GIFTS = [
  { id: 1, price: "R$ 1.000", title: "Aliança pra Kamila", description: "Pra ver se ele toma vergonha na cara e oficializa logo.", icon: <Heart className="w-6 h-6 text-pink-500" /> },
  { id: 2, price: "R$ 50", title: "Kit Ressaca", description: "Engov e Epocler para o dia seguinte do churrasco.", icon: <Stethoscope className="w-6 h-6 text-blue-500" /> },
  { id: 3, price: "R$ 200", title: "Curso de Adulto", description: "Aulas de como pagar boletos sem chorar no banho.", icon: <GraduationCap className="w-6 h-6 text-purple-500" /> },
  { id: 4, price: "R$ 100", title: "Vaquinha Upgrade", description: "Contribuição para o aumento do limite do cartão.", icon: <UserPlus className="w-6 h-6 text-green-500" /> },
  { id: 5, price: "R$ 30", title: "Minoxidil", description: "Porque a calvície não é mais uma ameaça, é um fato.", icon: <Scissors className="w-6 h-6 text-orange-400" /> },
  { id: 6, price: "R$ 75", title: "Terapia", description: "Para entender por que ele ainda acha que tem 18 anos.", icon: <Laugh className="w-6 h-6 text-indigo-400" /> },
  { id: 7, price: "R$ 150", title: "Fundo p/ Multas", description: "Pelo som alto ou por dormir na calçada.", icon: <Flame className="w-6 h-6 text-red-500" /> },
  { id: 8, price: "R$ 80", title: "Oração e Fé", description: "Porque só Deus sabe como ele chegou aos 32 inteiro.", icon: <Beer className="w-6 h-6 text-yellow-500" /> }
];

export default function App() {
  const [nome, setNome] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!rsvpStatus) {
      setError("Escolhe uma opção aí, abençoado!");
      return;
    }

    if (!supabase) {
      setError("Supabase não inicializado.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Tentando inserir:", { nome, status: rsvpStatus });
      
      const { data, error: supabaseError } = await supabase
        .from('confirmacoes')
        .insert([{ nome, status: rsvpStatus }])
        .select();

      if (supabaseError) {
        console.error("Erro do Supabase:", supabaseError);
        throw new Error(supabaseError.message);
      }

      console.log("Sucesso:", data);
      setSubmitted(true);
    } catch (err: any) {
      setError(`Erro: ${err.message || 'Erro desconhecido'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="z-10 max-w-4xl">
          <span className="inline-block px-4 py-1 rounded-full bg-zinc-800 text-yellow-400 font-bold text-sm mb-6 uppercase tracking-widest">Sobrevivendo desde 1994</span>
          <h1 className="text-6xl md:text-9xl font-bungee leading-tight mb-8 tracking-tighter uppercase">XANDINHO <span className="text-yellow-400">32</span> ANOS</h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-12">Churrasco, gelada e ressacas que duram 3 dias.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#rsvp" className="px-10 py-5 bg-yellow-400 text-black text-2xl font-bungee rounded-2xl hover:bg-white transition-all shadow-[6px_6px_0px_0px_white] active:translate-y-1">CONFIRMAR</a>
            <a href="#presentes" className="px-10 py-5 border-2 border-white text-white text-2xl font-bungee rounded-2xl hover:bg-zinc-900 transition-all">PRESENTES</a>
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 text-center">
          <Calendar className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bungee mb-2 uppercase">10 JAN</h3>
          <p className="text-zinc-500 font-bold uppercase">Sábado, às 12:00</p>
        </div>
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 text-center">
          <MapPin className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bungee mb-2 uppercase">BAGÉ / RS</h3>
          <p className="text-zinc-500 font-bold uppercase">R. Barão do Triunfo, 1428</p>
        </div>
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 text-center">
          <Beer className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bungee mb-2 uppercase">OPEN BAR</h3>
          <p className="text-zinc-500 font-bold uppercase">Deus nos ajude</p>
        </div>
      </section>

      {/* Presentes */}
      <section id="presentes" className="py-24 bg-zinc-950 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-bungee mb-16 uppercase">LISTA DE <span className="text-yellow-400">PRESENTES</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {GIFTS.map(gift => (
              <div key={gift.id} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-zinc-800 rounded-lg">{gift.icon}</div>
                    <span className="text-yellow-400 font-bungee text-lg">{gift.price}</span>
                  </div>
                  <h4 className="font-bold mb-2 uppercase text-lg">{gift.title}</h4>
                  <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{gift.description}</p>
                </div>
                <button className="w-full py-3 bg-zinc-800 hover:bg-yellow-400 hover:text-black rounded-xl font-bold transition-all uppercase">Contribuir</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-32 px-6">
        <div className="max-w-2xl mx-auto bg-white text-black p-8 md:p-12 rounded-[40px] shadow-[12px_12px_0px_0px_#eab308]">
          <h2 className="text-4xl md:text-6xl font-bungee text-center mb-12 uppercase">VAI VIR?</h2>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase mb-2">Seu nome ou apelido:</label>
                <input required type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Xandinho do Copo" className="w-full bg-zinc-100 border-2 border-zinc-200 p-5 rounded-2xl focus:border-yellow-400 outline-none font-bold text-lg" />
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-bold uppercase mb-2">Status da presença:</p>
                {['Tô dentro!', 'Não vou, sou um péssimo amigo.', 'Talvez, se tiver picanha.'].map(status => (
                  <label key={status} className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all ${rsvpStatus === status ? 'border-yellow-500 bg-yellow-50' : 'border-zinc-200'}`}>
                    <input type="radio" name="rsvp" value={status} onChange={(e) => setRsvpStatus(e.target.value)} className="hidden" />
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${rsvpStatus === status ? 'border-yellow-500' : 'border-zinc-300'}`}>
                      {rsvpStatus === status && <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>}
                    </div>
                    <span className="font-bold text-lg">{status}</span>
                  </label>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl font-bold border-2 border-red-200 text-sm">
                  {error}
                </div>
              )}

              <button disabled={isSubmitting} type="submit" className="w-full py-6 bg-black text-white font-bungee text-2xl rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0px_8px_0px_0px_#444] hover:translate-y-1 hover:shadow-none">
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'CONFIRMAR AGORA'}
              </button>
            </form>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h3 className="text-5xl font-bungee text-green-600 mb-4 uppercase">FEITO!</h3>
              <p className="text-xl font-bold">Xandinho já está separando a sua gelada.</p>
              <button onClick={() => setSubmitted(false)} className="mt-10 text-zinc-400 hover:text-black underline font-bold">Mudar minha resposta</button>
            </div>
          )}
        </div>
      </section>

      <footer className="py-16 text-center text-zinc-600 font-bungee border-t border-zinc-900 tracking-widest uppercase">
        XANDINHO 32 - BAGÉ/RS - 2024
      </footer>
    </div>
  );
}
