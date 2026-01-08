
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

// ==============================================================================
// 🛠️ CONFIGURAÇÃO DO SUPABASE (DADOS ATUALIZADOS)
// ==============================================================================

// URL exata fornecida pelo usuário
const supabaseUrl: string = 'https://rxylvuuysuczxfhfaxtf.supabase.co'; 

// Chave anon public exata fornecida pelo usuário
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eWx2dXV5c3VjenhmaGZheHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MTM0OTEsImV4cCI6MjA4MzM4OTQ5MX0.Fx06zLwLD2VsyDdphKxhUsNWTv2K4x018e8nALgVZaQ';

let supabase: SupabaseClient | null = null;

try {
  // Inicialização segura
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
  console.error("Erro ao iniciar Supabase:", e);
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
      setError("Erro de configuração: Verifique a URL e a Chave API.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Tentando conectar ao projeto:", supabaseUrl);
      
      const { error: supabaseError, data } = await supabase
        .from('confirmacoes')
        .insert([{ nome: nome.trim(), status: rsvpStatus }])
        .select();

      if (supabaseError) {
        console.error("Erro retornado pelo servidor:", supabaseError);
        throw new Error(supabaseError.message);
      }

      console.log("Inserção bem-sucedida:", data);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Erro completo da requisição:", err);
      
      // Tratamento específico para o erro de conexão
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setError("Erro de conexão! Verifique se o projeto no Supabase não está pausado ou se há algum bloqueador de anúncios impedindo o acesso.");
      } else {
        setError(`Erro: ${err.message || 'Houve um problema ao salvar sua resposta.'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-black to-black opacity-50"></div>
        <div className="z-10 max-w-4xl">
          <span className="inline-block px-4 py-1 rounded-full bg-zinc-900 text-yellow-400 font-bold text-sm mb-6 uppercase tracking-[0.2em] border border-zinc-800">Bagé / RS • 2024</span>
          <h1 className="text-6xl md:text-9xl font-bungee leading-none mb-8 tracking-tighter uppercase italic">XANDINHO <span className="text-yellow-400 block md:inline">32</span></h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-medium">Churrasco, cerveja gelada e as melhores decisões erradas da fronteira.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#rsvp" className="px-12 py-6 bg-yellow-400 text-black text-2xl font-bungee rounded-2xl hover:bg-white transition-all shadow-[8px_8px_0px_0px_white] active:translate-y-1 active:shadow-none uppercase">CONFIRMAR</a>
            <a href="#presentes" className="px-12 py-6 border-2 border-white text-white text-2xl font-bungee rounded-2xl hover:bg-zinc-900 transition-all uppercase">PRESENTES</a>
          </div>
        </div>
      </section>

      {/* Main Info */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Calendar className="w-12 h-12 text-yellow-400" />, title: "10 JAN", subtitle: "SÁBADO • 12:00" },
          { icon: <MapPin className="w-12 h-12 text-green-500" />, title: "BAGÉ / RS", subtitle: "R. BARÃO DO TRIUNFO, 1428" },
          { icon: <Beer className="w-12 h-12 text-orange-500" />, title: "OPEN BAR", subtitle: "ATÉ O CORPO AGUENTAR" }
        ].map((item, idx) => (
          <div key={idx} className="bg-zinc-900/40 p-10 rounded-[32px] border border-zinc-800 text-center backdrop-blur-md">
            <div className="flex justify-center mb-6">{item.icon}</div>
            <h3 className="text-3xl font-bungee mb-2 uppercase tracking-tight">{item.title}</h3>
            <p className="text-zinc-500 font-black uppercase text-sm tracking-widest">{item.subtitle}</p>
          </div>
        ))}
      </section>

      {/* Gift List */}
      <section id="presentes" className="py-24 bg-zinc-950 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-8xl font-bungee mb-4 uppercase leading-none">AJUDE O <span className="text-yellow-400">VEIO</span></h2>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-sm">Lista de presentes (não obrigatórios, mas recomendados)</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GIFTS.map(gift => (
              <div key={gift.id} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 flex flex-col justify-between group hover:border-yellow-400/30 transition-all duration-500">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-yellow-400 group-hover:text-black transition-all duration-500">{gift.icon}</div>
                    <span className="text-yellow-400 font-bungee text-xl">{gift.price}</span>
                  </div>
                  <h4 className="font-bold mb-3 uppercase text-xl tracking-tight">{gift.title}</h4>
                  <p className="text-zinc-500 text-sm mb-8 leading-relaxed font-medium">{gift.description}</p>
                </div>
                <button className="w-full py-4 bg-zinc-800 hover:bg-yellow-400 hover:text-black rounded-2xl font-black transition-all uppercase tracking-tighter text-sm">Contribuir via PIX</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Form */}
      <section id="rsvp" className="py-32 px-6">
        <div className="max-w-2xl mx-auto bg-white text-black p-10 md:p-16 rounded-[50px] shadow-[16px_16px_0px_0px_#eab308]">
          <h2 className="text-5xl md:text-7xl font-bungee text-center mb-4 uppercase leading-none italic">RSVP</h2>
          <p className="text-center text-zinc-400 font-bold uppercase mb-12 tracking-widest text-sm">Confirme sua presença abaixo</p>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase mb-3 ml-2 text-zinc-400 tracking-widest">Seu nome de guerra:</label>
                <input 
                  required 
                  type="text" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  placeholder="Xandinho da Galera" 
                  className="w-full bg-zinc-100 border-2 border-zinc-100 p-6 rounded-[24px] focus:border-yellow-400 focus:bg-white outline-none font-bold text-xl transition-all" 
                />
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase mb-1 ml-2 text-zinc-400 tracking-widest">Vai encarar?</p>
                {['Tô dentro!', 'Não vou, sou um péssimo amigo.', 'Talvez, se tiver picanha.'].map(status => (
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
                  <span className="text-sm leading-tight">{error}</span>
                </div>
              )}

              <button 
                disabled={isSubmitting} 
                type="submit" 
                className="w-full py-8 bg-black text-white font-bungee text-3xl rounded-[24px] flex items-center justify-center gap-4 transition-all shadow-[0px_10px_0px_0px_#333] hover:translate-y-1 hover:shadow-none active:scale-95 disabled:opacity-50 uppercase italic"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'CONFIRMAR'}
              </button>
            </form>
          ) : (
            <div className="text-center py-16">
              <div className="relative inline-block mb-10">
                <CheckCircle2 className="w-32 h-32 text-green-500 relative z-10 animate-bounce" />
                <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-40 scale-150"></div>
              </div>
              <h3 className="text-6xl font-bungee text-green-600 mb-6 uppercase italic">RESERVADO!</h3>
              <p className="text-2xl font-bold text-zinc-700">A picanha e a cerveja já estão tremendo de medo de você.</p>
              <button 
                onClick={() => setSubmitted(false)} 
                className="mt-12 text-zinc-400 hover:text-black underline font-black transition-colors uppercase text-xs tracking-[0.2em]"
              >
                Mudar minha resposta
              </button>
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
