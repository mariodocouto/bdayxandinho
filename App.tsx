
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Beer, 
  Flame, 
  Music, 
  Laugh, 
  Gift, 
  ExternalLink, 
  Heart, 
  Stethoscope, 
  GraduationCap, 
  ArrowUp, 
  UserPlus,
  Scissors
} from 'lucide-react';

// --- Constants & Types ---

interface GiftItem {
  id: number;
  price: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const GIFTS: GiftItem[] = [
  {
    id: 1,
    price: "R$ 1.000",
    title: "Aliança pra Kamila",
    description: "Pra ver se ele finalmente toma vergonha na cara e oficializa o negócio.",
    icon: <Heart className="w-6 h-6 text-pink-500" />
  },
  {
    id: 2,
    price: "R$ 50",
    title: "Kit Ressaca Profissional",
    description: "Engov, Epocler e um abraço, porque amanhã o Xandinho vai estar em posição fetal.",
    icon: <Stethoscope className="w-6 h-6 text-blue-500" />
  },
  {
    id: 3,
    price: "R$ 200",
    title: "Curso: Como ser Adulto",
    description: "Aulas de como pagar boletos sem chorar e como não esquecer a chave no trinco.",
    icon: <GraduationCap className="w-6 h-6 text-purple-500" />
  },
  {
    id: 4,
    price: "R$ 100",
    title: "Vaquinha p/ Upgrade",
    description: "Contribuição para a cirurgia de aumento... do limite do cartão de crédito. (Ou não).",
    icon: <UserPlus className="w-6 h-6 text-green-500" />
  },
  {
    id: 5,
    price: "R$ 30",
    title: "Minoxidil de Emergência",
    description: "A calvície não é mais uma ameaça, é uma realidade batendo na porta (e na testa).",
    icon: <Scissors className="w-6 h-6 text-orange-400" />
  },
  {
    id: 6,
    price: "R$ 75",
    title: "Primeiro Mês de Terapia",
    description: "Para entender por que ele ainda acha que tem 18 anos quando vê uma geladeira cheia.",
    icon: <Laugh className="w-6 h-6 text-indigo-400" />
  },
  {
    id: 7,
    price: "R$ 150",
    title: "Fundo p/ Multas",
    description: "Pelo som alto ou por dormir em local público (a calçada da festa).",
    icon: <Flame className="w-6 h-6 text-red-500" />
  },
  {
    id: 8,
    price: "R$ 80",
    title: "Oração e Fé",
    description: "Porque só Deus sabe como ele chegou aos 32 anos inteiro.",
    icon: <Beer className="w-6 h-6 text-yellow-500" />
  }
];

// --- Sub-components ---

const SectionTitle: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light }) => (
  <div className="mb-12 text-center">
    <h2 className={`text-4xl md:text-6xl font-bungee mb-4 ${light ? 'text-black' : 'text-yellow-400'}`}>
      {title}
    </h2>
    {subtitle && <p className={`text-xl ${light ? 'text-zinc-800' : 'text-zinc-400'}`}>{subtitle}</p>}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-zinc-900 border border-zinc-800 p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02] hover:border-yellow-400/50 ${className}`}>
    {children}
  </div>
);

const FloatingButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <a 
      href="#rsvp" 
      className={`fixed bottom-8 right-8 z-50 bg-green-500 text-black px-6 py-4 rounded-full font-bold shadow-2xl flex items-center gap-2 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <Beer className="w-5 h-5 fill-current" />
      BORA PRO CHURRAS
    </a>
  );
};

// --- Main App ---

export default function App() {
  const [rsvpStatus, setRsvpStatus] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen selection:bg-yellow-400 selection:text-black">
      <FloatingButton />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="z-10 max-w-5xl">
          <span className="inline-block px-4 py-1 rounded-full bg-zinc-800 text-yellow-400 font-bold text-sm mb-6 animate-bounce">
            CHAMANDO TODOS OS SOBREVIVENTES
          </span>
          <h1 className="text-6xl md:text-9xl font-bungee leading-tight mb-8">
            XANDINHO FAZ <span className="text-yellow-400">32 ANOS</span>
          </h1>
          <p className="text-xl md:text-3xl text-zinc-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Churras liberado, cerveja gelada e <span className="underline decoration-green-500 decoration-4">decisões questionáveis</span>.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="#rsvp" className="w-full md:w-auto px-12 py-5 bg-yellow-400 text-black text-2xl font-bungee rounded-2xl hover:bg-white transition-all transform hover:scale-110 active:scale-95 shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]">
              CONFIRMAR PRESENÇA
            </a>
            <a href="#presentes" className="w-full md:w-auto px-12 py-5 bg-transparent border-2 border-white text-white text-2xl font-bungee rounded-2xl hover:bg-zinc-800 transition-all">
              VER PRESENTES 🎁
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowUp className="w-8 h-8 rotate-180" />
        </div>
      </section>

      {/* Event Info */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="info">
        <SectionTitle title="ONDE E QUANDO?" subtitle="Só não chega atrasado pra não pegar só a gordura da picanha." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center group">
            <div className="w-16 h-16 bg-yellow-400/10 text-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">DATA</h3>
            <p className="text-zinc-400 text-lg">10 de Janeiro (Sábado)</p>
          </Card>

          <Card className="text-center group">
            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 group-hover:text-black transition-colors">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">HORÁRIO</h3>
            <p className="text-zinc-400 text-lg">A partir das 12:00</p>
          </Card>

          <Card className="text-center group">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500 group-hover:text-black transition-colors">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">LOCAL</h3>
            <p className="text-zinc-400 text-lg">Rua Barão do Triunfo, 1428<br/>Centro (Casa Verde), Bagé/RS</p>
          </Card>
        </div>

        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-3xl font-bungee text-yellow-400 mb-4">O CARDÁPIO DA DESGRAÇA:</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-xl">
                <Flame className="w-6 h-6 text-orange-500" /> Churrasco de verdade
              </li>
              <li className="flex items-center gap-3 text-xl">
                <Beer className="w-6 h-6 text-yellow-500" /> 60 litros de cerveja (quem beber água será expulso)
              </li>
              <li className="flex items-center gap-3 text-xl">
                <Music className="w-6 h-6 text-purple-500" /> Música, risadas e histórias que morrem aqui
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 h-64 bg-zinc-800 rounded-2xl overflow-hidden relative border-4 border-zinc-700 shadow-xl">
            {/* Embedded map placeholder logic */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3415.525287042539!2d-54.10893042436853!3d-31.321354890940375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9503d9876f2df83f%3A0x6b4c10c9c744f4ed!2sR.%20Bar%C3%A3o%20do%20Triunfo%2C%201428%20-%20Centro%2C%20Bag%C3%A9%20-%20RS%2C%2096400-110!5e0!3m2!1spt-BR!2sbr!4v1701234567890!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy"
            ></iframe>
            <div className="absolute bottom-4 right-4">
              <a 
                href="https://maps.google.com/?q=Rua+Barão+do+Triunfo+1428+Bagé+RS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-yellow-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Abrir no Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-yellow-400 py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="A TRAGÉDIA EM FOTOS" subtitle="Momentos em que o Xandinho jurou que nunca mais beberia." light />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div 
                key={num} 
                className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
              >
                <img 
                  src={`foto${num}.jpeg`} 
                  alt={`Xandinho ${num}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${num + 32}/600/600`;
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bungee text-sm md:text-xl">#MITO</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expectation / Quotes */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title="VAMOS SER SINCEROS" />
          
          <div className="space-y-12">
            <blockquote className="text-3xl md:text-5xl font-bold italic text-zinc-300">
              "Se acabar a cerveja, a amizade continua. <span className="text-yellow-400 underline decoration-white">Eu acho.</span>"
            </blockquote>
            <blockquote className="text-3xl md:text-5xl font-bold italic text-zinc-300">
              "Chegue cedo para garantir carne. <span className="text-green-500">E dignidade.</span>"
            </blockquote>
            <blockquote className="text-3xl md:text-5xl font-bold italic text-zinc-300">
              "32 anos nas costas e <span className="line-through text-zinc-600">nenhuma certeza na vida</span> muitos boletos."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-24 px-6 bg-zinc-950" id="presentes">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="LISTA DE PRESENTES" 
            subtitle="Porque amor é legal, mas amor não paga o Minoxidil nem a terapia." 
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GIFTS.map((gift) => (
              <Card key={gift.id} className="flex flex-col justify-between h-full bg-zinc-900/50 border-zinc-800">
                <div>
                  <div className="mb-4 flex justify-between items-start">
                    <div className="p-3 bg-zinc-800 rounded-xl">
                      {gift.icon}
                    </div>
                    <span className="text-2xl font-bungee text-yellow-400">{gift.price}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{gift.title}</h3>
                  <p className="text-zinc-400 mb-6 text-sm leading-relaxed">{gift.description}</p>
                </div>
                <button className="w-full py-3 bg-zinc-800 hover:bg-yellow-400 hover:text-black text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group">
                  Contribuir <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 p-8 bg-green-500 rounded-3xl text-center text-black">
            <h4 className="text-2xl font-bungee mb-2">QUER MANDAR QUALQUER VALOR?</h4>
            <p className="text-xl font-bold mb-4">PIX: xandinho@vaimorrerderessaca.com</p>
            <p className="text-sm opacity-75">(Todo valor será revertido em álcool e possivelmente picanha)</p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-24 px-6 max-w-3xl mx-auto" id="rsvp">
        <div className="bg-white text-black p-8 md:p-12 rounded-[40px] shadow-[15px_15px_0px_0px_rgba(234,179,8,1)]">
          <SectionTitle title="VAI OU NÃO VAI?" light />
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase mb-2">Teu Nome (Sem apelido idiota, por favor):</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: João da Cerveja"
                  className="w-full bg-zinc-100 border-2 border-zinc-200 p-4 rounded-xl focus:border-yellow-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-4">Qual é a tua situação?</label>
                <div className="grid grid-cols-1 gap-3">
                  {['Tô dentro! Já tô até com sede.', 'Não vou, sou um péssimo amigo.', 'Talvez, depende da marca da cerveja.'].map((status) => (
                    <label 
                      key={status}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${rsvpStatus === status ? 'border-green-500 bg-green-50' : 'border-zinc-200 hover:border-zinc-300'}`}
                    >
                      <input 
                        type="radio" 
                        name="rsvp" 
                        value={status}
                        onChange={(e) => setRsvpStatus(e.target.value)}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${rsvpStatus === status ? 'border-green-500' : 'border-zinc-300'}`}>
                        {rsvpStatus === status && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                      </div>
                      <span className="font-bold">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-black text-white font-bungee text-2xl rounded-2xl hover:bg-zinc-800 transition-all shadow-xl active:scale-95"
              >
                CONFIRMAR E MORRER DE RESSACA
              </button>
            </form>
          ) : (
            <div className="text-center py-12 animate-bounce">
              <h3 className="text-4xl font-bungee text-green-600 mb-4">SALVO NO SISTEMA!</h3>
              <p className="text-xl">Se não aparecer, a gente vai te buscar em casa. 🍻</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 text-center px-6">
        <p className="text-3xl font-bungee text-zinc-700 mb-4">32 ANOS BEM VIVIDOS.</p>
        <p className="text-xl text-zinc-500 italic mb-8">Agora é só ladeira abaixo.</p>
        <div className="flex items-center justify-center gap-2 text-2xl font-bungee text-yellow-400">
          XANDINHO 🍻🔥
        </div>
        <p className="mt-8 text-zinc-800 text-xs uppercase tracking-widest">
          Bagé, RS - Capital da Amizade e do Churrasco (e agora da Calvície do Xandinho)
        </p>
      </footer>
    </div>
  );
}
