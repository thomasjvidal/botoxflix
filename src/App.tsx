import { useEffect, useRef, useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Shield, 
  Clock, 
  MessageCircle,
  ChevronDown,
  Award,
  Heart
} from 'lucide-react';
import DiagnosticChat from './components/DiagnosticChat';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const benefits = [
    { 
      icon: Calendar, 
      text: 'Aplicações planejadas',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
      desc: 'Cronograma personalizado para manter sua pele sempre jovem e revitalizada.'
    },
    { 
      icon: Clock, 
      text: 'Manutenção contínua',
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
      desc: 'Sua beleza não precisa de pausas. Cuidado constante que se adapta à sua rotina.'
    },
    { 
      icon: Shield, 
      text: 'Prevenção do envelhecimento',
      image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800',
      desc: 'O melhor momento para cuidar do futuro é agora. Prevenção com elegância.'
    },
    { 
      icon: Sparkles, 
      text: 'Resultados mais naturais',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
      desc: 'A arte da sutileza. Realçamos sua beleza sem alterar sua essência única.'
    },
    { 
      icon: Heart, 
      text: 'Sem exageros ou excesso',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      desc: 'Equilíbrio perfeito entre ciência e estética para um visual leve e descansado.'
    },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-[#E50914]/30">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'glass py-3 border-b border-white/10' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom flex items-center justify-center">
          <div className="hidden md:flex items-center gap-10">
            {['sobre', 'beneficios', 'como-funciona'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)} 
                className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors tracking-wide uppercase"
              >
                {item === 'sobre' ? 'O que é' : item === 'beneficios' ? 'Benefícios' : 'Como funciona'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Sophisticated Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero.png" 
            alt="Botoxflix" 
            className="w-full h-full object-cover object-[75%_15%] md:object-[right_center] scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent opacity-90" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-6">
          <div className="w-full animate-fade-in-up text-center md:text-left -mt-32 md:-mt-40 relative">
            {/* Gradientes Suaves de Fundo */}
            <div className="absolute -inset-10 bg-black/40 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -inset-20 bg-red-900/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />
            
            <div className="relative">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-tight mb-2 px-2 md:px-0">
                BOTOX<span className="netflix-gradient-text">FLIX</span>
              </h1>
              <div className="text-[#ff4d4d] text-lg sm:text-2xl md:text-3xl font-medium tracking-[0.2em] mb-56 sm:mb-80 md:mb-20 uppercase italic px-4 md:px-0">
                Botox por assinatura
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0 leading-tight">
                A sofisticação do botox por assinatura. <br className="hidden md:block" />
                <span className="text-gray-500 italic text-base sm:text-lg">Resultados naturais, acompanhamento contínuo.</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6">
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#25D366] hover:bg-[#E50914] text-white text-sm font-bold transition-all duration-500 shadow-lg shadow-green-500/10 hover:shadow-red-500/20 hover:scale-105 active:scale-95 group"
                >
                  <span>Começar agora</span>
                  <ChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('sobre')}
                  className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Explorar conceito
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float opacity-50">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>
      </section>

      {/* About Section - Apple Style Grid */}
      <section 
        id="sobre" 
        className="section-padding relative bg-[#050505]"
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className={`transition-all duration-1000 ${visibleSections.has('sobre') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <h2 className="section-title">
                O futuro da <br />
                <span className="text-gray-500">estética preventiva.</span>
              </h2>
              
              <div className="space-y-8">
                <p className="text-xl text-gray-400 leading-relaxed">
                  O Botoxflix não é apenas um procedimento. É um compromisso com a sua melhor versão, mantendo a naturalidade que você valoriza.
                </p>
                
                <p className="text-lg text-gray-500 leading-relaxed">
                  Esqueça as correções tardias. Nosso modelo de assinatura garante que você esteja sempre impecável, com aplicações milimetricamente planejadas.
                </p>

                <div className="pt-8 flex items-center gap-6 border-t border-white/10">
                  <div className="flex -space-x-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 font-medium">
                    <span className="text-white font-bold">+500</span> pacientes satisfeitos
                  </p>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${visibleSections.has('sobre') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#E50914] to-[#6B1A2A] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-black rounded-[2rem] overflow-hidden border border-white/10">
                  <img 
                    src="/images/insta-profile.png" 
                    alt="Thabata Braga" 
                    className="w-full grayscale hover:grayscale-0 transition-all duration-1000 duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                    <p className="text-xs font-bold tracking-[0.2em] text-[#C9A962] mb-2 uppercase">Especialista Responsável</p>
                    <h3 className="text-2xl font-bold">Dra. Thabata Braga</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Netflix Style Cards */}
      <section 
        id="beneficios" 
        className="section-padding relative bg-black"
      >
        <div className="container-custom">
          <div className={`text-center mb-24 transition-all duration-1000 ${visibleSections.has('beneficios') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="section-title">Por que <span className="text-[#E50914]">assinar</span>?</h2>
            <p className="section-desc">A experiência definitiva em cuidados faciais, inspirada no seu lifestyle.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-[2rem] min-h-[400px] flex flex-col justify-end p-8 transition-all duration-1000 ${
                  visibleSections.has('beneficios') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img 
                    src={benefit.image} 
                    alt={benefit.text} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-[#E50914] transition-all duration-500">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{benefit.text}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Nike Style Energy */}
      <section 
        id="como-funciona" 
        className="section-padding relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#E50914]/5" />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${visibleSections.has('como-funciona') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <h2 className="apple-headline text-5xl md:text-8xl mb-12 uppercase italic tracking-tighter">
                Just <span className="text-[#E50914]">Glow</span> It.
              </h2>
              
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] mb-12">
                <p className="text-2xl text-gray-300 mb-10 leading-relaxed">
                  Pronta para elevar o padrão do seu cuidado pessoal? <br />
                  <span className="text-white font-bold">O seu momento Botoxflix começa agora.</span>
                </p>
                
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#25D366] hover:bg-[#E50914] text-white text-sm font-bold transition-all duration-500 shadow-lg shadow-green-500/10 hover:shadow-red-500/20 hover:scale-105 active:scale-95 group"
                >
                  <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Agendar minha avaliação</span>
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">Seguro & Confiável</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">Qualidade Premium</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">Suporte 24/7</span>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist Apple Style */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start justify-between gap-16">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-xl font-bold tracking-tighter">BOTOX<span className="text-[#E50914]">FLIX</span></span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                A revolução no cuidado estético. Onde a tecnologia encontra a arte da naturalidade.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-20">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Navegação</h4>
                <ul className="space-y-4">
                  {['O que é', 'Benefícios', 'Planos'].map(item => (
                    <li key={item}><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Social</h4>
                <ul className="space-y-4">
                  {['Instagram', 'WhatsApp', 'Facebook'].map(item => (
                    <li key={item}><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
            <p className="text-[12px] text-gray-600">
              © 2026 Botoxflix. All rights reserved. Designed for excellence.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[12px] text-gray-600 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-[12px] text-gray-600 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Diagnostic Chat Component */}
      <DiagnosticChat isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  );
}

export default App;
